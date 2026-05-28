import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { GlobalLoadingService } from './global-loading.service';

export const SKIP_LOADING = new HttpContextToken<boolean>(() => false);

export const httpLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_LOADING)) {
    return next(req);
  }
  const globalLoading = inject(GlobalLoadingService);
  globalLoading.show();
  return next(req).pipe(finalize(() => globalLoading.hide()));
};
