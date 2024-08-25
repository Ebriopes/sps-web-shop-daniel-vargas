import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  required: () => `Este campo es requerido`,
  minlength: ({ requiredLength, actualLength }: { [key: string]: number }) =>
    `El campo debe tener un tamaño minimo de ${requiredLength}`,
  maxlength: ({ requiredLength, actualLength }: { [key: string]: number }) =>
    `El campo debe tener un tamaño máximo de ${requiredLength}`,
  pattern: ({ actualValue }: { actualValue: string }) =>
    `El formato de "${actualValue}" es incorrecto`,
  max: ({ actual, max }: { [key: string]: number }) =>
    `El valor "${actual}" es mayor al límite máximo ${max}`,
  min: ({ actual, min }: { [key: string]: number }) =>
    `El valor "${actual}" es menor al mínimo valor aceptado ${min}`,
  email: (error: any) => 'Formato de correo incorrecto',
  matching: (error: any) => 'Las contraseñas no coinciden',
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors,
});
