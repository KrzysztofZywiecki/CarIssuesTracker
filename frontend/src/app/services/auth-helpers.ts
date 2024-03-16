import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";

export function authGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | boolean | UrlTree {
  const router = inject(Router);
  const authService = inject(AuthService);
  console.log(authService.loginState);
  if (authService.loginState) {
    return true;
  }

  return router.parseUrl("/auth");
}
