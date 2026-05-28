import { SchemaPath, validate } from '@angular/forms/signals';

export function passwordsMatch(
  confirmPath: SchemaPath<string>,
  passwordPath: SchemaPath<string>,
  options?: { message?: string },
) {
  validate(confirmPath, ({ value, valueOf }) => {
    if (value() !== valueOf(passwordPath)) {
      return {
        kind: 'passwordMismatch',
        message: options?.message ?? 'Passwords do not match',
      };
    }
    return null;
  });
}
