import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, retry, throwError, timeout, timer, TimeoutError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth';

const ATTEMPT_TIMEOUT_MS = 20000;
// Aiven's free-trial database can take a couple of minutes to unpause,
// on top of Render's own cold start, so the retry budget needs enough
// headroom to outlast that instead of giving up early.
const MAX_RETRIES = 9;
const RETRY_DELAY_STEP_MS = 6000;

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
