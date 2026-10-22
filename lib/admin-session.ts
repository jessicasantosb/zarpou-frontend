import { serverEnv } from "@/lib/env";
import {
  decodeBase64UrlText,
  hmacSign,
  hmacVerify,
  importHmacKey,
  toBase64Url,
} from "@/lib/hmac";

export const ADMIN_SESSION_COOKIE = "zarpou_admin_session_v2";
// Versões anteriores do código gravaram cookies homônimos com paths diferentes.
// O parser do Next usa o ÚLTIMO cookie homônimo do header e os navegadores
// ordenam por path (o mais longo por último) — um cookie legado sombreava o
// novo e o login ficava preso em loop. Com o nome versionado, o middleware
// ignora qualquer legado; o logout também os remove.
export const LEGACY_ADMIN_SESSION_COOKIES = [
  { name: "zarpou_admin_session", path: "/admin" },
  { name: "zarpou_admin_session", path: "/" },
];
export const ADMIN_SESSION_TTL_SECONDS = 8 * 60 * 60;

const SESSION_SECRET =
  serverEnv.AUTH_SESSION_SECRET || "zarpou-admin-session-dev-secret";

if (
  process.env.NODE_ENV === "production" &&
  !serverEnv.AUTH_SESSION_SECRET
) {
  console.warn(
    "[Zarpou] AUTH_SESSION_SECRET não configurada: usando segredo de desenvolvimento. Configure a variável de ambiente em produção.",
  );
}

const CONTEXT = "zarpou-admin-session";

export const signAdminSession = async (): Promise<string> => {
  const expiresAt = String(Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000);
  const key = await importHmacKey(SESSION_SECRET);
  const signature = await hmacSign(key, `${CONTEXT}:${expiresAt}`);
  // hmacSign já retorna base64url — codificar de novo gerava uma assinatura
  // de 43 bytes que nunca verifica (crypto.subtle exige 32) e o middleware
  // rejeitava toda sessão (307 → /admin/login em loop).
  return `${toBase64Url(expiresAt)}.${signature}`;
};

export const verifyAdminSession = async (
  value: string | null | undefined,
): Promise<boolean> => {
  if (!value) return false;

  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;

  const expiresAt = decodeBase64UrlText(payload);
  const key = await importHmacKey(SESSION_SECRET);
  const isValidSignature = await hmacVerify(
    key,
    `${CONTEXT}:${expiresAt}`,
    signature,
  );
  if (!isValidSignature) return false;

  return Number.isFinite(Number(expiresAt)) && Date.now() < Number(expiresAt);
};

export const adminSessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/admin",
  maxAge: ADMIN_SESSION_TTL_SECONDS,
};
