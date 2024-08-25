import { FormGroup, ValidationErrors } from '@angular/forms';

export function confirmPasswordValidator(repeatPasswordControlName: string) {
  return (form: FormGroup): ValidationErrors | null => {
    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get(repeatPasswordControlName);

    if (passwordControl && confirmPasswordControl) {
      if (confirmPasswordControl.value !== passwordControl.value) {
        confirmPasswordControl.setErrors({ matching: true });

        return { matching: true };
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }

    return null;
  };
}
