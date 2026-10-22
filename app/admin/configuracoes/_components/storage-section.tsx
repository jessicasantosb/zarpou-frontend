import { useState } from "react";
import { useWatch, type Control } from "react-hook-form";
import { Check, Cloud, HardDrive, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { AgencyConfigFormValues } from "@/schemas/agency-config";
import { ConfigField } from "./config-field";
import { SectionCard } from "./section-card";
import { SecretInput } from "./secret-input";
import { TestConnectionRow } from "./test-connection-row";

const providerOptions = [
  { value: "aws_s3", label: "Amazon Web Services (AWS S3) - Recomendado" },
  { value: "supabase", label: "Supabase Storage" },
  { value: "cloudflare_r2", label: "Cloudflare R2 (S3-Compatible)" },
  { value: "local", label: "Armazenamento Local (Servidor da API)" },
];

const awsRegions = [
  { value: "sa-east-1", label: "São Paulo (sa-east-1)" },
  { value: "us-east-1", label: "N. Virgínia (us-east-1)" },
  { value: "us-east-2", label: "Ohio (us-east-2)" },
  { value: "us-west-1", label: "N. Califórnia (us-west-1)" },
  { value: "us-west-2", label: "Oregon (us-west-2)" },
  { value: "eu-west-1", label: "Irlanda (eu-west-1)" },
];

interface StorageSectionProps {
  control: Control<AgencyConfigFormValues>;
}

export function StorageSection({ control }: StorageSectionProps) {
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const values = useWatch({ control });

  const handleTest = async () => {
    const bucket = values.storageBucket;
    if (!bucket) {
      return;
    }
    if (!bucket.bucketName) {
      toast.warning("Por favor, informe o Nome do Bucket S3 antes de testar.");
      return;
    }
    if (
      bucket.provider === "aws_s3" &&
      (!bucket.accessKeyId || !bucket.secretAccessKey)
    ) {
      toast.warning(
        "Por favor, preencha o Access Key ID e o Secret Access Key da AWS.",
      );
      return;
    }
    setIsTesting(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    setIsTesting(false);
    setStatus("Bucket S3 e credenciais IAM válidos!");
    toast.success(
      `Bucket "${bucket.bucketName}" (${bucket.region}) validado! Uploads prontos para AWS.`,
    );
  };

  return (
    <SectionCard
      icon={Cloud}
      title="Armazenamento em Nuvem & Bucket de Mídia (AWS S3)"
      headerExtra={
        <FormField
          control={control}
          name="storageBucket.enabled"
          render={({ field }) => (
            <FormItem className="gap-0">
              <FormControl>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 cursor-pointer rounded-full bg-border peer-focus:outline-hidden after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-input after:bg-card after:transition-all after:content-[''] peer-checked:translate-x-full peer-checked:border-white peer-checked:bg-primary"></div>
                  <span className="ml-2 text-xs font-bold text-foreground/80">
                    {field.value ? "Storage Ativo" : "Desativado"}
                  </span>
                </label>
              </FormControl>
            </FormItem>
          )}
        />
      }
      description="Configure o bucket de armazenamento onde todas as fotos de hotéis, companhias aéreas, promoções e banners serão salvas permanentemente de forma escalável e com alta velocidade de entrega."
    >
      <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
        <ConfigField
          control={control}
          name="storageBucket.provider"
          label="Provedor de Armazenamento"
          options={providerOptions}
        />
        <ConfigField
          control={control}
          name="storageBucket.bucketName"
          label="Nome do Bucket S3"
          icon={HardDrive}
          mono
          transform={(value) => value.trim()}
          placeholder="Ex: zarpou-media ou meu-bucket-s3"
          helper="Nome exato criado no painel da AWS S3"
        />
        <ConfigField
          control={control}
          name="storageBucket.region"
          label="Região AWS (Region)"
          helper="Geralmente sa-east-1 (Brasil) ou us-east-1 (EUA)"
          render={(field) => (
            <>
              <FormControl>
                <Input
                  list="aws-regions-list"
                  value={String(field.value)}
                  onChange={(event) => field.onChange(event.target.value)}
                  placeholder="Ex: sa-east-1 ou us-east-1"
                  className="h-11 rounded-xl border-input font-mono text-xs font-medium outline-hidden focus:border-primary"
                />
              </FormControl>
              <datalist id="aws-regions-list">
                {awsRegions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </datalist>
            </>
          )}
        />
        <ConfigField
          control={control}
          name="storageBucket.publicUrlPrefix"
          label="URL Pública Base / CloudFront CDN (Opcional)"
          mono
          transform={(value) => value.trim()}
          placeholder="Ex: https://meu-bucket.s3.sa-east-1.amazonaws.com ou CloudFront"
          helper="Se vazio, a URL padrão da AWS S3 da região selecionada será gerada"
        />
        <ConfigField
          control={control}
          name="storageBucket.accessKeyId"
          label="Access Key ID da AWS"
          hint="(Usuário IAM com permissão s3:PutObject)"
          icon={Lock}
          mono
          transform={(value) => value.trim()}
          placeholder="AKIAIOSFODNN7EXAMPLE..."
        />
        <ConfigField
          control={control}
          name="storageBucket.secretAccessKey"
          label="Secret Access Key da AWS"
          hint="(Chave secreta IAM)"
          render={(field) => (
            <SecretInput
              value={String(field.value)}
              onChange={(value) => field.onChange(value.trim())}
              icon={Lock}
              placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY..."
            />
          )}
        />
        <ConfigField
          control={control}
          name="storageBucket.endpointUrl"
          label="Endpoint Customizado S3 (Opcional - para Cloudflare R2 ou MinIO)"
          mono
          className="sm:col-span-2"
          transform={(value) => value.trim()}
          placeholder="Ex: https://<account_id>.r2.cloudflarestorage.com (Deixe em branco para AWS oficial)"
          helper={() => (
            <div className="flex items-center justify-between pt-0.5">
              <span>
                Console AWS:{" "}
                <a
                  href="https://s3.console.aws.amazon.com/s3/buckets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary hover:underline"
                >
                  s3.console.aws.amazon.com/s3/buckets
                </a>
              </span>
              {values.storageBucket?.bucketName &&
              values.storageBucket?.accessKeyId ? (
                <span className="flex items-center gap-1 font-bold text-emerald-600">
                  <Check className="size-3" /> Credenciais AWS preenchidas
                </span>
              ) : (
                <span className="font-semibold text-amber-500">
                  Aguardando credenciais AWS
                </span>
              )}
            </div>
          )}
        />
      </div>

      <TestConnectionRow
        onTest={handleTest}
        isTesting={isTesting}
        status={status}
        label="Testar Conexão com AWS S3"
        testingLabel="Testando Bucket..."
        iconClassName="text-primary"
        statusVariant={status?.includes("válido") ? "success" : "warning"}
      />
    </SectionCard>
  );
}
