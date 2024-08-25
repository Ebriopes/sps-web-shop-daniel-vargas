import { Routes } from '@angular/router';
import { authGuard } from './common/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () =>
      import('src/app/views/login/login.component').then(
        (m) => m.LoginComponent
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'auth' },
      {
        path: 'auth',
        loadComponent: () =>
          import('src/app/views/login/auth/auth.component').then(
            (m) => m.AuthComponent
          ),
        title: 'Inicio de sesión',
        data: {
          cardTitle: 'Ingresa con tu cuenta ',
        },
      },
      {
        path: 'register',
        loadComponent: () =>
          import('src/app/views/login/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Registro',
        data: {
          cardTitle: 'Crea una cuenta',
        },
      },
    ],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('src/app/views/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
