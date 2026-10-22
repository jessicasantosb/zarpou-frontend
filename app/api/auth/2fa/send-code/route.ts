import { NextResponse } from "next/server";
import { Resend } from "resend";
import { get2FaEmailHtml } from "../../../(utils)/get-2fa-email-html";
import { generateEmailPin, maskEmail } from "@/lib/two-factor";
import { serverEnv } from "@/lib/env";
import {
  TWO_FA_EMAIL_COOKIE,
  email2FaCookieOptions,
  signEmail2FaSession,
} from "@/lib/email-2fa-session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, existingCode } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "E-mail de destinatário inválido ou não informado." },
        { status: 400 }
      );
    }

    const code = existingCode || generateEmailPin();
    const cookieValue = await signEmail2FaSession(
      email.trim().toLowerCase(),
      code,
    );
    const apiKey = serverEnv.RESEND_API_KEY;

    if (!apiKey) {
      const response = NextResponse.json({
        success: true,
        simulated: true,
        maskedEmail: maskEmail(email),
        message: `Código de verificação enviado para ${maskEmail(email)}.`,
      });
      response.cookies.set(
        TWO_FA_EMAIL_COOKIE,
        cookieValue,
        email2FaCookieOptions,
      );
      return response;
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Zarpou Segurança <seguranca@zarpouviagens.com.br>",
      to: [email.trim().toLowerCase()],
      subject: `🔒 Seu código de segurança Zarpou: ${code}`,
      html: get2FaEmailHtml({ name, email, code }),
    });

    if (error) {
      console.warn("[Zarpou 2FA] Erro no envio com Resend, operando com fallback:", error);
      const response = NextResponse.json({
        success: true,
        simulated: true,
        maskedEmail: maskEmail(email),
        message: `Código gerado para ${maskEmail(email)}.`,
      });
      response.cookies.set(
        TWO_FA_EMAIL_COOKIE,
        cookieValue,
        email2FaCookieOptions,
      );
      return response;
    }

    const response = NextResponse.json({
      success: true,
      simulated: false,
      data,
      maskedEmail: maskEmail(email),
      message: `Código enviado com sucesso para ${maskEmail(email)}.`,
    });
    response.cookies.set(
      TWO_FA_EMAIL_COOKIE,
      cookieValue,
      email2FaCookieOptions,
    );
    return response;
  } catch (err: unknown) {
    console.error("[Zarpou 2FA] Erro na rota de envio:", err);
    return NextResponse.json(
      { error: "Erro interno ao enviar código de segurança." },
      { status: 500 }
    );
  }
}
