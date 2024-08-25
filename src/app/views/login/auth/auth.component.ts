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

import { ICredentials } from '@models/credentials.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  authForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  showPassword = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthenticationService
  ) {}

  login() {
    const loginCredentials: ICredentials = this.authForm.value;

    this.authService.login(loginCredentials).subscribe(console.log);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
