import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';

export const authGuard: CanActivateFn = () => {
  const userProfileService = inject(UserProfileService);
  const router = inject(Router);

  if (userProfileService.profile()) {
    return true;
  }
  return router.createUrlTree(['/sign-in']);
};
