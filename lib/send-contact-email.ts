import { Contact } from "@/schemas/contact-form/contact";
import { api } from "@/lib/api";

export const sendContactEmail = async (values: Contact) => {
  try {
    const data = await api.post("/inquiries", values);
    return data;
  } catch (err) {
    console.warn(
      "Backend API indisponível, enviando via rota de contingência Next.js:",
      err,
    );
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Falha ao enviar solicitação de consultoria.");
    }

    return response.json();
  }
};
