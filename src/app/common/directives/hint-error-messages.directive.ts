import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  OnDestroy,
} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { NgControl, ValidationErrors } from '@angular/forms';

import { Subject, combineLatest, takeUntil } from 'rxjs';
import { FORM_ERRORS } from '@models/tokens/form-errors.token';

@Directive({
  selector: 'mat-error[dynamicErrors]',
  standalone: true,
})
export class HintErrorMessagesDirective implements AfterViewInit, OnDestroy {
  private readonly unsubscribe = new Subject<void>();

  constructor(
    private readonly elementRef: ElementRef,
    @Inject(FORM_ERRORS) private readonly errors: any,
    @Inject(MatFormField) private readonly control: MatFormField
  ) {}

  ngAfterViewInit(): void {
    // Initial message error
    this.setText('Este campo es requerido');

    if (this.control?._control?.ngControl instanceof NgControl) {
      const formControl = this.control._control.ngControl;

      combineLatest([formControl.valueChanges, formControl.statusChanges])
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => {
          const controlErrors = formControl.errors;

          if (controlErrors) {
            this.setError(controlErrors);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  setError(controlErrors: ValidationErrors) {
    const [controlErrorKey] = Object.keys(controlErrors);
    const getError = this.errors[controlErrorKey];

    if (!getError) {
      console.error('Unknown error: ', controlErrorKey);
    } else {
      const message = getError(controlErrors[controlErrorKey]);

      this.setText(message);
    }
  }

  setText(message: string) {
    (this.elementRef.nativeElement as HTMLElement).innerText = message;
  }
}
