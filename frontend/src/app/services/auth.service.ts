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
import { LoginDTO } from "../models/login-dto";
import { RegisterDTO } from "../models/register-dto";
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
  constructor(private http: HttpClient) {
    this._accessToken = localStorage.getItem("accessToken");
    this._refreshToken = localStorage.getItem("refreshToken");
  }

  private _accessToken: string | null = null;
  private _refreshToken: string | null = null;

  isLoggedIn(): boolean {
    return this._accessToken !== null;
  }

  get accessToken(): string | null {
    return this._accessToken;
  }

  get refreshToken(): string | null {
    return this._refreshToken;
  }

  set accessToken(value: string | null) {
    this._accessToken = value;
    if (value !== null) {
      localStorage.setItem("accessToken", value);
    } else {
      localStorage.removeItem("accessToken");
    }
  }

  set refreshToken(value: string | null) {
    this._refreshToken = value;
    if (value !== null) {
      localStorage.setItem("refreshRoken", value);
    } else {
      localStorage.removeItem("refreshRoken");
    }
  }

  logIn(loginInfo: LoginDTO): Observable<boolean> {
    const response = this.http
      .post<LoginResponse>(`${environment.apiUrl}/login`, loginInfo)
      .pipe(
        tap((response) => {
          this.accessToken = response.accessToken;
          this.refreshToken = response.refreshToken;
        }),
        map((_) => true),
        catchError((err) => of(false))
      );

    return response;
  }

  register(registerInfo: RegisterDTO): Observable<RegisterStatus> {
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
        this.refreshToken = null;
        this.accessToken = null;
      })
    );
  }

  refreshTokens(): Observable<void> {
    return this.http
      .post<RefreshResponse>(`${environment.apiUrl}/refresh`, {
        refreshToken: this.refreshToken,
      })
      .pipe(
        tap((response) => {
          this.refreshToken = response.refreshToken;
          this.accessToken = response.accessToken;
        }),
        map((_) => {})
      );
  }
}
