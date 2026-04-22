import { HttpInterceptorFn } from '@angular/common/http';
import { AUTH_TOKEN_KEY } from '../../auth/user-profile.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) {
    return next(req);
  }

  return next(req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }));
};
