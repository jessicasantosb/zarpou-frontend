import { serverEnv } from "@/lib/env";
import { hmacSign, hmacVerify, importHmacKey, toBase64Url, decodeBase64UrlText } from "@/lib/hmac";

export const TWO_FA_EMAIL_COOKIE = "zarpou_2fa_email_code";
export const TWO_FA_EMAIL_TTL_SECONDS = 10 * 60;

const SESSION_SECRET =
  serverEnv.AUTH_SESSION_SECRET || "zarpou-admin-session-dev-secret";
const CONTEXT = "zarpou-2fa-email";

export const email2FaCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/api/auth/2fa",
  maxAge: TWO_FA_EMAIL_TTL_SECONDS,
};

export const signEmail2FaSession = async (
  email: string,
  code: string,
): Promise<string> => {
  const key = await importHmacKey(SESSION_SECRET);
  const codeHash = await hmacSign(key, `${CONTEXT}:code:${code}`);
  const expiresAt = String(Date.now() + TWO_FA_EMAIL_TTL_SECONDS * 1000);
  // "|" não aparece em nenhum segmento (encodeURIComponent escapa como %7C,
  // codeHash é base64url e expiresAt é numérico) — diferente de ".", que
  // quebrava o parse com e-mails pontuados (ex.: admin@zarpou.com.br).
  const payload = `${encodeURIComponent(email)}|${codeHash}|${expiresAt}`;
  const signature = await hmacSign(key, `${CONTEXT}:payload:${payload}`);
  // hmacSign já devolve base64url: codificar de novo gerava assinatura de
  // 43 bytes que nunca verifica e o 2FA por e-mail retornava sempre "expired".
  return `${toBase64Url(payload)}.${signature}`;
};

export const checkEmail2FaCode = async (
  sessionValue: string | null | undefined,
  email: string,
  code: string,
): Promise<"valid" | "invalid" | "expired"> => {
  if (!sessionValue) return "expired";

  const [payloadPart, signaturePart] = sessionValue.split(".");
  if (!payloadPart || !signaturePart) return "expired";

  const key = await importHmacKey(SESSION_SECRET);
  const payload = decodeBase64UrlText(payloadPart);
  const isValidSignature = await hmacVerify(
    key,
    `${CONTEXT}:payload:${payload}`,
    signaturePart,
  );
  if (!isValidSignature) return "expired";

  const [storedEmail, codeHash, expiresAt] = payload.split("|");
  if (!storedEmail || !codeHash || !expiresAt) return "expired";
  if (storedEmail !== encodeURIComponent(email)) return "expired";
  if (!Number.isFinite(Number(expiresAt)) || Date.now() >= Number(expiresAt)) {
    return "expired";
  }

  const providedHash = await hmacSign(key, `${CONTEXT}:code:${code}`);
  return providedHash === codeHash ? "valid" : "invalid";
};
