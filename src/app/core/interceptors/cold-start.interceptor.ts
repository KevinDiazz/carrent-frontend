import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, retry, throwError, timeout, timer, TimeoutError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth';

const ATTEMPT_TIMEOUT_MS = 20000;
const MAX_RETRIES = 5;
const RETRY_DELAY_STEP_MS = 4000;

function isColdStartError(error: unknown): boolean {
  if (error instanceof TimeoutError) {
    return true;
  }

  return (
    error instanceof HttpErrorResponse &&
    (error.status === 0 || error.status >= 502)
  );
}

export const coldStartInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  let countedAsWaking = false;

  return next(req).pipe(
    timeout(ATTEMPT_TIMEOUT_MS),
    retry({
      count: MAX_RETRIES,
      delay: (error, retryCount) => {
        if (!isColdStartError(error)) {
          return throwError(() => error);
        }

        if (!countedAsWaking) {
          countedAsWaking = true;
          authService.beginWaking();
        }

        return timer(retryCount * RETRY_DELAY_STEP_MS);
      },
    }),
    finalize(() => {
      if (countedAsWaking) {
        authService.endWaking();
      }
    }),
  );
};
