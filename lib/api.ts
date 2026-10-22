/**
 * Cliente HTTP unificado para comunicação com a API FastAPI da Zarpou Viagens.
 * Gerencia tokens de autenticação Bearer (Admin, Cliente e B2B Empresa),
 * serialização JSON e tratamento amigável de erros.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8008/api/v1";

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  const path = window.location.pathname;
  if (path.startsWith("/admin")) {
    return localStorage.getItem("zarpou-admin-token") || null;
  }
  if (path.startsWith("/empresas") || path.startsWith("/corporativo")) {
    return (
      localStorage.getItem("zarpou-company-token") ||
      localStorage.getItem("zarpou-admin-token") ||
      null
    );
  }
  return (
    localStorage.getItem("zarpou-admin-token") ||
    localStorage.getItem("zarpou-customer-token") ||
    localStorage.getItem("zarpou-company-token") ||
    null
  );
}

interface RequestOptions extends RequestInit {
  token?: string;
  skipAuth?: boolean;
}

/** Cabeçalhos de autenticação para chamadas JSON e multipart. */
function buildAuthHeaders(token?: string | null): Record<string, string> {
  const resolved = token ?? getStoredToken();
  return resolved ? { Authorization: `Bearer ${resolved}` } : {};
}

/** Lê o corpo da resposta respeitando JSON, texto e 204. */
async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return null;
  const contentType = response.headers.get("content-type");
  return contentType?.includes("application/json")
    ? response.json()
    : response.text();
}

/** Normaliza o formato de erro da API (FastAPI: detail/message) em uma mensagem legível. */
function extractErrorMessage(data: unknown, fallback: string): string {
  if (typeof data === "string" && data.length > 0) return data;
  if (typeof data !== "object" || data === null) return fallback;

  const error = data as {
    detail?: string | Array<{ msg?: string }>;
    message?: string;
  };

  if (typeof error.detail === "string") return error.detail;
  if (Array.isArray(error.detail) && error.detail[0]?.msg) {
    return error.detail[0].msg;
  }
  return error.message || fallback;
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (!options.skipAuth) {
    Object.assign(headers, buildAuthHeaders(options.token));
  }

  const response = await fetch(url, { ...options, headers });
  const data = await readResponseBody(response);

  if (!response.ok) {
    throw new ApiError(
      extractErrorMessage(data, "Erro inesperado ao comunicar com o servidor."),
      response.status,
      data,
    );
  }

  return data as T;
}

export const api = {
  get: <T = unknown>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { method: "GET", ...options }),

  post: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  put: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  patch: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  delete: <T = unknown>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { method: "DELETE", ...options }),
};

export interface UploadResult {
  success: boolean;
  url: string;
  provider: "aws_s3" | "cloudflare_r2" | "supabase" | "local" | string;
  filename: string;
  folder: string;
  size: number;
  contentType: string;
}

/**
 * Upload de planilha (CSV/XLSX) para importação em massa de catálogo.
 * Envia multipart para /imports/{resource} e retorna o job aceito (202) —
 * o processamento roda em background no backend (Celery).
 */
export async function uploadImportFile<T = unknown>(
  resource: string,
  file: File,
  mode: string = "upsert",
): Promise<T> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("mode", mode);

  const response = await fetch(`${API_BASE_URL}/imports/${resource}`, {
    method: "POST",
    headers: buildAuthHeaders(),
    body: formData,
  });
  const data = await readResponseBody(response);

  if (!response.ok) {
    throw new ApiError(
      extractErrorMessage(data, "Falha ao enviar o arquivo para importação."),
      response.status,
      data,
    );
  }
  return data as T;
}

/** Baixa o template (CSV/XLSX) de importação do recurso via fetch autenticado. */
export async function downloadImportTemplate(
  resource: string,
  format: "csv" | "xlsx",
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/imports/${resource}/template?format=${format}`,
    { headers: buildAuthHeaders() },
  );
  if (!response.ok) {
    throw new ApiError("Falha ao baixar o template.", response.status);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `template-${resource}.${format}`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export async function uploadFile(
  file: File,
  folder: string = "banners"
): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);

  const url = `${API_BASE_URL}/storage/upload?folder=${encodeURIComponent(folder)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: buildAuthHeaders(),
    body: formData,
  });
  const data = await readResponseBody(response);

  if (!response.ok) {
    throw new ApiError(
      extractErrorMessage(data, "Falha no upload da imagem."),
      response.status,
      data,
    );
  }

  return data as UploadResult;
}
