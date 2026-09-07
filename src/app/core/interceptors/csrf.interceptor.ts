import { HttpInterceptorFn } from '@angular/common/http';

function getCsrfToken(): string | null {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split('=')[1]);
}

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {

  const csrfToken = getCsrfToken();

  if (!csrfToken) {
    return next(req);
  }

  const csrfReq = req.clone({
    setHeaders: {
      'X-XSRF-TOKEN': csrfToken
    }
  });

  return next(csrfReq);
};