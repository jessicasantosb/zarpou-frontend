export const syncAdminSession = async (
  token: string | null,
): Promise<boolean> => {
  if (typeof window === "undefined") return false;

  try {
    const response = token
      ? await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })
      : await fetch("/api/auth/session", { method: "DELETE" });
    return response.ok;
  } catch {
    return false;
  }
};
