import * as React from "react";

import { Eye, EyeOff, Lock, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

interface InputPasswordProps extends React.ComponentProps<"input"> {
  isRegister?: boolean;
  error?: string;
  setError?: (error: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  icon?: LucideIcon;
}

function InputPassword({
  isRegister,
  error,
  setError,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  icon: Icon = Lock,
  className,
  placeholder,
  ...props
}: InputPasswordProps) {
  return (
    <div className="relative">
      <Icon className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        required
        placeholder={
          placeholder ?? (isRegister ? "Crie uma senha forte" : "••••••••")
        }
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
          if (error) setError?.("");
        }}
        className={cn("pl-10 pr-10", className)}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground/70 p-1 cursor-pointer transition"
        title={showPassword ? "Ocultar senha" : "Ver senha"}
      >
        {showPassword ? (
          <EyeOff className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
      </button>
    </div>
  );
}

export { InputPassword };
