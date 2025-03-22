import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let router = inject(Router);

  if (authService.isAdmin()) {
    console.log("Admin login, you can edit");
    return true;
  } else {
    console.log("No admin permissions, you cannot edit");
    return false;
  }
};
