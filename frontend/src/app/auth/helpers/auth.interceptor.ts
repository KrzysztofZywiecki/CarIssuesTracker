import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import {
  BehaviorSubject,
  Observable,
  catchError,
  concatMap,
  filter,
  finalize,
  of,
  retry,
  switchMap,
  take,
  throwError,
} from "rxjs";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private _router: Router) {}

  isRefreshing: boolean = false;
  tokenRefreshed: BehaviorSubject<boolean> = new BehaviorSubject(false);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this._authService.accessToken !== null) {
      req = this.addAccessToken(req);
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status == 401) {
          return this.refreshTokens(req, next);
        } else {
          throw error;
        }
      })
    );
  }

  private addAccessToken(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authService.accessToken}`,
      },
    });
  }

  private refreshTokens(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (this.isRefreshing) {
      return this.tokenRefreshed.pipe(
        filter((x) => x),
        take(1),
        concatMap(() => next.handle(this.addAccessToken(req)))
      );
    } else {
      this.isRefreshing = true;
      this.tokenRefreshed.next(false);

      return this._authService.refreshTokens().pipe(
        concatMap((_) => {
          this.tokenRefreshed.next(true);
          return next.handle(this.addAccessToken(req));
        }),
        catchError((err) => {
          this._authService.logOut();
          throw err;
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    }
  }
}
