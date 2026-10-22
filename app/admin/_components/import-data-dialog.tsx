"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Download,
  FileSpreadsheet,
  History,
  Loader2,
  Upload,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api, ApiError, downloadImportTemplate, uploadImportFile } from "@/lib/api";
import type { ImportJob, ImportJobCreated } from "@/types/import";

function statusBadge(status: ImportJob["status"]) {
  switch (status) {
    case "completed":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
          <CheckCircle2 className="size-3" />
          Concluída
        </span>
      );
    case "failed":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 border border-destructive/20 px-2.5 py-1 text-[11px] font-bold text-destructive">
          <AlertTriangle className="size-3" />
          Falhou
        </span>
      );
    case "processing":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 border border-sky-200 px-2.5 py-1 text-[11px] font-bold text-sky-700">
          <Loader2 className="size-3 animate-spin" />
          Processando
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-muted border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
          <Clock3 className="size-3" />
          Na fila
        </span>
      );
  }
}

function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface ImportDataButtonProps {
  /** Recurso no backend (hotels | destinations | flights | promotions | coupons) */
  resource: string;
  /** Nome exibido do catálogo (ex.: "hospedagens") */
  label: string;
}

export function ImportDataButton({ resource, label }: ImportDataButtonProps) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeJob, setActiveJob] = useState<ImportJob | null>(null);
  const [recentJobs, setRecentJobs] = useState<ImportJob[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadHistory = useCallback(async () => {
    try {
      const jobs = await api.get<ImportJob[]>(`/imports/${resource}/jobs`);
      setRecentJobs(jobs);
    } catch {
      // histórico é best-effort; a importação ativa continua sendo acompanhada via polling
    }
  }, [resource]);

  useEffect(() => {
    if (open) loadHistory();
  }, [open, loadHistory]);

  // Polling do job ativo até o status final
  useEffect(() => {
    if (!activeJob || activeJob.status === "completed" || activeJob.status === "failed") {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      return;
    }
    pollRef.current = setInterval(async () => {
      try {
        const job = await api.get<ImportJob>(`/imports/jobs/${activeJob.id}`);
        setActiveJob(job);
        if (job.status === "completed" || job.status === "failed") {
          loadHistory();
        }
      } catch {
        // tenta de novo no próximo tick
      }
    }, 2000);
    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [activeJob, loadHistory]);

  const onPickFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = event.target.files?.[0] ?? null;
    setFile(chosen);
  };

  const onUpload = async () => {
    if (!file) {
      toast.info("Escolha um arquivo .csv ou .xlsx primeiro.");
      return;
    }
    setUploading(true);
    try {
      const created = await uploadImportFile<ImportJobCreated>(resource, file);
      setActiveJob(created.job);
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      toast.success("Arquivo enviado! O processamento roda em segundo plano.");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Falha ao enviar o arquivo.";
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const onDownloadTemplate = async (format: "csv" | "xlsx") => {
    try {
      await downloadImportTemplate(resource, format);
    } catch {
      toast.error("Falha ao baixar o template.");
    }
  };

  const isRunning =
    activeJob && (activeJob.status === "pending" || activeJob.status === "processing");
  const progress =
    activeJob && activeJob.total_rows > 0
      ? Math.round((activeJob.processed_rows / activeJob.total_rows) * 100)
      : 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border text-foreground/70 text-xs font-semibold hover:bg-muted transition cursor-pointer"
      >
        <Upload className="size-4" />
        Importar
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <FileSpreadsheet className="size-5 text-primary" />
              Importar {label} em massa
            </DialogTitle>
            <DialogDescription>
              Envie uma planilha CSV ou XLSX. O processamento roda em segundo
              plano — pode fechar esta janela acompanhando depois pelo histórico.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            {/* 1. Template */}
            <div className="rounded-2xl border border-border bg-muted/50 p-4 space-y-2">
              <p className="text-xs font-bold text-foreground">
                1. Baixe o template com as colunas corretas
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onDownloadTemplate("csv")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-[11px] font-semibold text-foreground/80 hover:bg-muted transition cursor-pointer"
                >
                  <Download className="size-3.5" />
                  Template CSV
                </button>
                <button
                  type="button"
                  onClick={() => onDownloadTemplate("xlsx")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-[11px] font-semibold text-foreground/80 hover:bg-muted transition cursor-pointer"
                >
                  <Download className="size-3.5" />
                  Template XLSX
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Preencha as linhas e envie de volta. Linhas com o mesmo código já
                cadastrado são <strong>atualizadas</strong> (upsert); células
                vazias mantêm o valor atual.
              </p>
            </div>

            {/* 2. Upload */}
            <div className="rounded-2xl border border-border bg-muted/50 p-4 space-y-3">
              <p className="text-xs font-bold text-foreground">2. Envie o arquivo preenchido</p>
              <input
                ref={inputRef}
                type="file"
                accept=".csv,.xlsx"
                onChange={onPickFile}
                className="block w-full text-xs text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-bold file:text-white file:cursor-pointer hover:file:bg-primary-hover"
              />
              <button
                type="button"
                onClick={onUpload}
                disabled={uploading || !file}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-primary-hover transition cursor-pointer disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Upload className="size-4" />
                    Importar arquivo
                  </>
                )}
              </button>
            </div>

            {/* 3. Job ativo / relatório */}
            {activeJob && (
              <div className="rounded-2xl border border-border p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-foreground">
                    {activeJob.original_filename || "Importação"}
                  </p>
                  {statusBadge(activeJob.status)}
                </div>

                {isRunning ? (
                  <div className="space-y-2">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {activeJob.status === "pending"
                        ? "Aguardando o worker iniciar o processamento..."
                        : `Processando linha ${activeJob.processed_rows} de ${activeJob.total_rows}...`}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeJob.status === "failed" && activeJob.message && (
                      <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs font-semibold text-destructive">
                        {activeJob.message}
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-xl bg-muted p-2.5">
                        <p className="text-lg font-black text-foreground">{activeJob.total_rows}</p>
                        <p className="text-[10px] font-semibold text-muted-foreground">Linhas</p>
                      </div>
                      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2.5">
                        <p className="text-lg font-black text-emerald-700">{activeJob.success_count}</p>
                        <p className="text-[10px] font-semibold text-emerald-700/80">Importadas</p>
                      </div>
                      <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-2.5">
                        <p className="text-lg font-black text-destructive">{activeJob.error_count}</p>
                        <p className="text-[10px] font-semibold text-destructive/80">Falharam</p>
                      </div>
                    </div>

                    {activeJob.report && activeJob.report.errors.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-bold text-foreground">
                          Motivo das falhas (linha a linha):
                        </p>
                        <div className="max-h-44 overflow-y-auto rounded-xl border border-border divide-y divide-border">
                          {activeJob.report.errors.map((rowError) => (
                            <div
                              key={`${activeJob.id}-${rowError.row}`}
                              className="flex items-start gap-3 px-3 py-2 text-[11px]"
                            >
                              <span className="shrink-0 font-black text-foreground">
                                Linha {rowError.row}
                              </span>
                              <span className="text-muted-foreground">
                                {rowError.code ? `[${rowError.code}] ` : ""}
                                {rowError.error}
                              </span>
                            </div>
                          ))}
                        </div>
                        {activeJob.report.errors_truncated && (
                          <p className="text-[10px] text-muted-foreground">
                            Relatório limitado aos primeiros 500 erros.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 4. Histórico */}
            <div className="space-y-2">
              <p className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <History className="size-3.5 text-muted-foreground" />
                Importações recentes de {label}
              </p>
              {recentJobs.length === 0 ? (
                <p className="text-[11px] text-muted-foreground">
                  Nenhuma importação enviada ainda.
                </p>
              ) : (
                <div className="max-h-40 overflow-y-auto rounded-xl border border-border divide-y divide-border">
                  {recentJobs.map((job) => (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => setActiveJob(job)}
                      className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[11px] hover:bg-muted transition cursor-pointer"
                    >
                      <span className="truncate text-foreground/80">
                        {job.original_filename || job.id.slice(0, 8)} · {formatDate(job.created_at)}
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="font-semibold text-muted-foreground">
                          {job.success_count} ok / {job.error_count} erro
                        </span>
                        {statusBadge(job.status)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
