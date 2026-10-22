import { Info } from "lucide-react";

export function AccessNotice() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sky-900 shadow-2xs">
      <Info className="mt-0.5 size-5 shrink-0 text-sky-600" />
      <div className="space-y-1 text-xs">
        <p className="font-bold">Regra de Segurança de Acesso Ativa</p>
        <p className="leading-relaxed text-sky-800">
          Por política de segurança do sistema, o administrador atualmente
          conectado (sua conta){" "}
          <strong>não pode ser desativado nem excluído por você mesmo</strong>.
          Essa restrição previne que o painel administrativo fique trancado sem
          nenhum gestor ativo.
        </p>
      </div>
    </div>
  );
}
