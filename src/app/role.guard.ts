import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUserValue;

  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  const expectedRoles = route.data['roles'];

  if (expectedRoles && Array.isArray(expectedRoles)) {
    if (!expectedRoles.includes(currentUser.role)) {
      router.navigate(['/login']);
      return false;
    }
  }

  return true;
};