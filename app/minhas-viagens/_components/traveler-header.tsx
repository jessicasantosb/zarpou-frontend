import { LogOut } from "lucide-react";
import { Container } from "@/components/shared/container";

interface TravelerHeaderProps {
  name?: string;
  email?: string;
  onLogout: () => void;
}

export function TravelerHeader({ name, email, onLogout }: TravelerHeaderProps) {
  return (
    <div className="bg-primary text-white py-6 shadow-md border-b border-primary/20 mb-8">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary font-black text-lg">
              {name?.charAt(0) || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                Olá, {name}!
              </h1>
              <p className="text-xs text-white/80">
                {email} • Gerencie suas viagens, perfil e preferências
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2 bg-card/10 hover:bg-card/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition self-end sm:self-auto cursor-pointer"
          >
            <LogOut className="size-3.5" />
            Sair da Conta
          </button>
        </div>
      </Container>
    </div>
  );
}
