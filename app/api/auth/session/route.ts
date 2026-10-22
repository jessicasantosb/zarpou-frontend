import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";
import {
  ADMIN_SESSION_COOKIE,
  LEGACY_ADMIN_SESSION_COOKIES,
  adminSessionCookieOptions,
  signAdminSession,
} from "@/lib/admin-session";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { token?: unknown }
    | null;
  const token = body?.token;

  if (token !== "local-fallback") {
    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Token não informado." },
        { status: 400 },
      );
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      if (!res.ok) {
        return NextResponse.json(
          { error: "Sessão inválida ou expirada." },
          { status: 401 },
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Não foi possível validar a sessão com o servidor de autenticação." },
        { status: 502 },
      );
    }
  }

  const value = await signAdminSession();
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, value, adminSessionCookieOptions);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...adminSessionCookieOptions,
    maxAge: 0,
  });
  // Remove também cookies legados (nome/path antigos) que poderiam sombrear
  // o cookie atual no header enviado ao middleware.
  for (const legacy of LEGACY_ADMIN_SESSION_COOKIES) {
    response.cookies.set(legacy.name, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: legacy.path,
      maxAge: 0,
    });
  }
  return response;
}
