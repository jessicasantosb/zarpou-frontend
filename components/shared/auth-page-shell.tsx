import { Container } from "./container";

/** Moldura comum das telas de autenticação do cliente. */
export function AuthPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/50 pt-28 pb-16 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto bg-card rounded-3xl p-8 border border-border  space-y-6">
          {children}
        </div>
      </Container>
    </div>
  );
}
