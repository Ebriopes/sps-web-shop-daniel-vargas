import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

import { map } from 'rxjs';

import { AuthenticationService } from 'src/app/services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map((auth) => auth || router.parseUrl('login'))
  );
};
