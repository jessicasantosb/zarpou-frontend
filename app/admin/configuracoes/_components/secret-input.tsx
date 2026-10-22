import { useState } from "react";
import { Eye, EyeOff, Key, type LucideIcon } from "lucide-react";

interface SecretInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
}

export function SecretInput({
  value,
  onChange,
  placeholder,
  icon: Icon = Key,
}: SecretInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-input pl-10 pr-12 font-mono text-xs font-medium outline-hidden focus:border-primary"
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-muted-foreground hover:text-foreground/70"
        title={visible ? "Ocultar" : "Mostrar"}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}
