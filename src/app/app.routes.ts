import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () =>
      import('src/app/views/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  { path: '**', redirectTo: 'login' },
];
