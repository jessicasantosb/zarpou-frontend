const encoder = new TextEncoder();

export const toBase64Url = (data: ArrayBuffer | string) => {
  const bytes =
    typeof data === "string" ? encoder.encode(data) : new Uint8Array(data);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const fromBase64Url = (value: string) => {
  const padded = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
};

export const decodeBase64UrlText = (value: string) =>
  new TextDecoder().decode(fromBase64Url(value));

export const importHmacKey = (secret: string) =>
  crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );

export const hmacSign = async (
  key: CryptoKey,
  data: string,
): Promise<string> => {
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data),
  );
  return toBase64Url(signature);
};

export const hmacVerify = async (
  key: CryptoKey,
  data: string,
  signature: string,
): Promise<boolean> =>
  crypto.subtle.verify(
    "HMAC",
    key,
    fromBase64Url(signature),
    encoder.encode(data),
  );
