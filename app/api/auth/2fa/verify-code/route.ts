import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  TWO_FA_EMAIL_COOKIE,
  checkEmail2FaCode,
  email2FaCookieOptions,
} from "@/lib/email-2fa-session";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { email?: unknown; code?: unknown }
    | null;
  const email = body?.email;
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json(
      { error: "E-mail de destinatário inválido ou não informado." },
      { status: 400 }
    );
  }

  if (!/^\d{6}$/.test(code)) {
    return NextResponse.json(
      {
        error: "Código de e-mail incorreto. Tente novamente.",
        reason: "invalid",
      },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(TWO_FA_EMAIL_COOKIE)?.value;
  const result = await checkEmail2FaCode(
    sessionValue,
    email.trim().toLowerCase(),
    code,
  );

  if (result === "valid") {
    const response = NextResponse.json({ success: true });
    response.cookies.set(TWO_FA_EMAIL_COOKIE, "", {
      ...email2FaCookieOptions,
      maxAge: 0,
    });
    return response;
  }

  if (result === "expired") {
    return NextResponse.json(
      {
        error: "O código de verificação expirou. Solicite um novo.",
        reason: "expired",
      },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      error: "Código de e-mail incorreto. Tente novamente.",
      reason: "invalid",
    },
    { status: 401 }
  );
}
