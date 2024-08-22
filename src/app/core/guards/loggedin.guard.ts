import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedinGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if (localStorage.getItem('userToken') === null) {
    return true;
  } else {
    _Router.navigate(["/home"]);
    return false;
  }
};
