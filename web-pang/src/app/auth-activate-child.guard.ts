import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authActivateChildGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const user = authService.getUserDetail();
  const router = inject(Router)

  if (user && user.roles === 'Admin'){
    return true
  }else {
    router.navigate(['/login']);
    return false;
  }
};
