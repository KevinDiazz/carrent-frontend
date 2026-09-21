import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const checkUser = () => {
    const user = authService.getCurrentUser();
    return user ? true : router.createUrlTree(['/login']);
  };

  if (authService.isSessionRestored()) {
    return checkUser();
  }

  return authService.waitForSessionRestored().pipe(
    take(1),
    map(() => checkUser()),
  );
};