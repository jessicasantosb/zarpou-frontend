interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
  required?: boolean;
}

export function OtpInput({
  value,
  onChange,
  className,
  autoFocus,
  required,
}: OtpInputProps) {
  return (
    <input
      type="text"
      required={required}
      maxLength={6}
      inputMode="numeric"
      autoComplete="one-time-code"
      autoFocus={autoFocus}
      placeholder="000000"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
      className={className}
    />
  );
}
