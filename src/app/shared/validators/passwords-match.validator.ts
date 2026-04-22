import { FieldValidator, SchemaPath, SchemaPathRules } from '@angular/forms/signals';

export function passwordsMatch(
  passwordPath: SchemaPath<string, SchemaPathRules>
): FieldValidator<string> {
  return (ctx) => {
    if (ctx.value() && ctx.value() !== ctx.valueOf(passwordPath)) {
      return { kind: 'passwords-mismatch', message: 'Passwords do not match' };
    }
    return null;
  };
}
