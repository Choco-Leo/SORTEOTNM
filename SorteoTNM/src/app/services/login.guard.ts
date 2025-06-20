import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        router.navigate(['/registerGrupoST']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      return of(true);
    })
  );
};