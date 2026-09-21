import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isSessionRestored()) {
    const user = authService.getCurrentUser();

    return user?.role === 'ADMIN' ? true : router.createUrlTree(['/']);
  }

  return authService.waitForSessionRestored().pipe(
    take(1),
    map(() => {
      const user = authService.getCurrentUser();

      return user?.role === 'ADMIN' ? true : router.createUrlTree(['/']);
    }),
  );
};
