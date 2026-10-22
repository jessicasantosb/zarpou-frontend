export interface PasswordRule {
  label: string;
  message: string;
  test: (value: string) => boolean;
}

export const passwordChecks = {
  hasMinLength: (value: string) => value.length >= 8,
  hasUpperCase: (value: string) => /[A-Z]/.test(value),
  hasNumber: (value: string) => /[0-9]/.test(value),
  hasSpecialChar: (value: string) => /[^A-Za-z0-9]/.test(value),
};

export const PASSWORD_RULES: PasswordRule[] = [
  {
    label: "Mín. 8 caracteres",
    message: "A nova senha deve ter no mínimo 8 caracteres.",
    test: passwordChecks.hasMinLength,
  },
  {
    label: "1 Letra maiúscula (A-Z)",
    message: "A nova senha deve conter ao menos 1 letra maiúscula.",
    test: passwordChecks.hasUpperCase,
  },
  {
    label: "1 Número (0-9)",
    message: "A nova senha deve conter ao menos 1 número.",
    test: passwordChecks.hasNumber,
  },
  {
    label: "1 Especial (!@#$%&*)",
    message:
      "A nova senha deve conter ao menos 1 caractere especial (ex: !@#$%&*).",
    test: passwordChecks.hasSpecialChar,
  },
];

export const getFailedPasswordRules = (value: string): string[] =>
  PASSWORD_RULES.filter((rule) => !rule.test(value)).map((rule) => rule.label);

export const getFirstFailedPasswordMessage = (value: string): string | null => {
  const failed = PASSWORD_RULES.find((rule) => !rule.test(value));
  return failed ? failed.message : null;
};

export const isStrongPassword = (value: string): boolean =>
  PASSWORD_RULES.every((rule) => rule.test(value));
