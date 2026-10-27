import Link from "next/link";
import { Plane } from "lucide-react";
import { Container } from "@/components/shared/container";
import { formatDateBR } from "@/lib/format-date";

interface FlightsSummaryHeaderProps {
  departureDate: string;
  returnDate: string;
  totalTravelers: number;
}

export function FlightsSummaryHeader({
  departureDate,
  returnDate,
  totalTravelers,
}: FlightsSummaryHeaderProps) {
  return (
    <div className="bg-primary text-white py-4  border-b border-primary/20 mb-8">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-card/10 flex items-center justify-center">
              <Plane className="size-5 text-secondary" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">
                Voos Selecionados Zarpou
              </h1>
              <p className="text-xs text-white/80">
                Ida {formatDateBR(departureDate)} • Volta{" "}
                {formatDateBR(returnDate)} • {totalTravelers}{" "}
                {totalTravelers === 1 ? "passageiro" : "passageiros"}
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="px-4 py-2 bg-secondary text-primary font-bold text-xs rounded-xl hover:bg-secondary/90 transition "
          >
            Modificar Pesquisa
          </Link>
        </div>
      </Container>
    </div>
  );
}
