import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import {
  Observable,
  catchError,
  concatMap,
  map,
  of,
  switchMap,
  tap,
} from "rxjs";
import { environment } from "../../environments/environment.development";
import { LoginDto } from "../models/login-dto";
import { RegisterDto } from "../models/register-dto";
import { LoginResponse } from "../models/login-response";
import {
  RegisterStatus,
  RegisterSuccess,
  RegisterFailure,
} from "./auth-helpers";
import { RefreshResponse } from "../models/refresh-response";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private _accessToken: string | null = null;
  private _refreshToken: string | null = null;
  private _tokenType: string | null = null;

  isLoggedIn(): boolean {
    return this._accessToken !== null;
  }

  get accessToken(): string | null {
    return this._accessToken;
  }

  logIn(loginInfo: LoginDto): Observable<boolean> {
    const response = this.http
      .post<LoginResponse>(`${environment.apiUrl}/login`, loginInfo)
      .pipe(
        tap((response) => {
          this._accessToken = response.accessToken;
          this._refreshToken = response.refreshToken;
          this._tokenType = response.tokenType;
        }),
        map((_) => true),
        catchError((err) => of(false))
      );

    return response;
  }

  register(registerInfo: RegisterDto): Observable<RegisterStatus> {
    if (registerInfo.password !== registerInfo.confirmPassword) {
      return of({ status: 1, messages: ["Passwords don't match"] });
    }
    const response = this.http
      .post<void>(`${environment.apiUrl}/register`, {
        email: registerInfo.email,
        password: registerInfo.password,
      })
      .pipe(
        map((_) => {
          return { status: 0 } as RegisterSuccess;
        }),
        catchError((err) => {
          return of({
            status: 1,
            messages: err.error.errors,
          } as RegisterFailure);
        })
      );
    return response;
  }

  logOut(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/logOut`, {}).pipe(
      tap((_) => {
        this._refreshToken = null;
        this._accessToken = null;
        this._tokenType = null;
      })
    );
  }

  refreshTokens(): Observable<void> {
    return this.http
      .post<RefreshResponse>(`${environment.apiUrl}/refresh`, {
        refreshToken: this._refreshToken,
      })
      .pipe(
        tap((response) => {
          this._refreshToken = response.refreshToken;
          this._accessToken = response.accessToken;
          this._tokenType = response.tokenType;
        }),
        map((_) => {})
      );
  }
}
