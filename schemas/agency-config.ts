import { z } from "zod";
import {
  defaultAiChat,
  defaultPaymentGateway,
  defaultStorageBucket,
  defaultWhatsappApi,
} from "@/stores/config-store";
import { AgencyConfig } from "@/types/config";

export const agencyConfigSchema = z.object({
  companyName: z.string(),
  tradingName: z.string(),
  cnpj: z.string().trim().min(1, "Informe o CNPJ da agência"),
  cadastur: z.string().trim().min(1, "Informe o registro Cadastur"),
  whatsapp: z
    .string()
    .min(1, "Informe o WhatsApp oficial do site")
    .regex(/^\d+$/, "Use apenas números, incluindo DDI e DDD"),
  whatsappMessage: z.string(),
  email: z
    .string()
    .refine(
      (value) => value === "" || z.email().safeParse(value).success,
      "E-mail inválido",
    ),
  phone: z.string(),
  instagram: z.string(),
  linkedin: z.string(),
  address: z.string(),
  termsAndConditions: z.string(),
  privacyPolicy: z.string(),
  resendApiKey: z.string(),
  whatsappApi: z.object({
    provider: z.enum(["meta_cloud", "evolution_api", "z_api", "other"]),
    enabled: z.boolean(),
    apiToken: z.string(),
    phoneNumberId: z.string(),
    businessAccountId: z.string(),
    apiUrl: z.string(),
  }),
  paymentGateway: z.object({
    provider: z.enum(["mercadopago", "asaas", "pagarme", "stripe", "efi"]),
    environment: z.enum(["sandbox", "production"]),
    publicKey: z.string(),
    secretKey: z.string(),
    pixKey: z.string(),
    webhookSecret: z.string(),
    activeMethods: z.object({
      creditCard: z.boolean(),
      pix: z.boolean(),
      boleto: z.boolean(),
    }),
  }),
  aiChat: z.object({
    enabled: z.boolean(),
    provider: z.enum(["openai", "gemini", "groq", "anthropic", "other"]),
    apiKey: z.string(),
    model: z.string(),
    systemPrompt: z.string(),
    welcomeMessage: z.string(),
  }),
  storageBucket: z.object({
    provider: z.enum(["aws_s3", "supabase", "cloudflare_r2", "local"]),
    enabled: z.boolean(),
    bucketName: z.string(),
    region: z.string(),
    accessKeyId: z.string(),
    secretAccessKey: z.string(),
    endpointUrl: z.string(),
    publicUrlPrefix: z.string(),
  }),
});

export type AgencyConfigFormValues = z.infer<typeof agencyConfigSchema>;

export const buildAgencyConfigDefaults = (
  config: AgencyConfig,
): AgencyConfigFormValues => ({
  companyName: config.companyName ?? "",
  tradingName: config.tradingName ?? "",
  cnpj: config.cnpj ?? "",
  cadastur: config.cadastur ?? "",
  whatsapp: config.whatsapp ?? "",
  whatsappMessage: config.whatsappMessage ?? "",
  email: config.email ?? "",
  phone: config.phone ?? "",
  instagram: config.instagram ?? "",
  linkedin: config.linkedin ?? "",
  address: config.address ?? "",
  termsAndConditions: config.termsAndConditions ?? "",
  privacyPolicy: config.privacyPolicy ?? "",
  resendApiKey: config.resendApiKey || "",
  whatsappApi: { ...defaultWhatsappApi, ...(config.whatsappApi || {}) },
  paymentGateway: {
    ...defaultPaymentGateway,
    ...(config.paymentGateway || {}),
    activeMethods: {
      ...defaultPaymentGateway.activeMethods,
      ...(config.paymentGateway?.activeMethods || {}),
    },
  },
  aiChat: { ...defaultAiChat, ...(config.aiChat || {}) },
  storageBucket: {
    ...defaultStorageBucket,
    ...(config.storageBucket || {}),
    endpointUrl: config.storageBucket?.endpointUrl ?? "",
    publicUrlPrefix: config.storageBucket?.publicUrlPrefix ?? "",
  },
});
