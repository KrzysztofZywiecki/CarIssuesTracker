import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { Observable, catchError, retry, switchMap, throwError } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private _router: Router) {}

  isRefreshing: boolean = false;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this._authService.accessToken !== null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this._authService.accessToken}`,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status == 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          return this._authService.refreshTokens().pipe(
            switchMap(() => {
              this.isRefreshing = false;
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${this._authService.accessToken}`,
                },
              });
              return next.handle(req);
            }),
            catchError((err) => {
              this.isRefreshing = false;
              this._router.navigate(["auth"]);
              throw err;
            })
          );
        } else {
          throw error;
        }
      })
    );
  }
}
