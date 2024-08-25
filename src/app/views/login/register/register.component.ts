import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { ILogData } from '@models/credentials.model';
import { NotificationService } from 'src/app/services/notification.service';
import { confirmPasswordValidator } from 'src/app/common/directives/confirm-password.directive';
import { HintErrorMessagesDirective } from '@directives/hint-error-messages.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    HintErrorMessagesDirective,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  get passwordControl() {
    return this.registerForm.controls['password'];
  }

  registerForm: FormGroup = this.fb.group(
    {
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordValidation: ['', [Validators.required]],
    },
    { validators: confirmPasswordValidator('passwordValidation') }
  );

  showPassword = false;
  showConfirmPass = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotificationService
  ) {}

  register() {
    const registerData: ILogData = this.registerForm.value;

    this.authService.register(registerData).subscribe(({ id }) => {
      const message = `¡Tu usuario ha sido registrad con el ID ${id}!`;
      const title = 'Completado';

      this.notifyService.show(message, title);
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassVisibility() {
    this.showConfirmPass = !this.showConfirmPass;
  }
}
