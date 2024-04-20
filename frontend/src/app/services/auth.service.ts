import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import {
  Observable,
  catchError,
  concatMap,
  map,
  of,
  switchMap,
  tap,
  throwError,
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
  constructor(private http: HttpClient, private backend: HttpBackend) {
    this._accessToken = localStorage.getItem("accessToken");
    this._refreshToken = localStorage.getItem("refreshToken");
    this._userId = localStorage.getItem("userId");
  }

  private _accessToken: string | null = null;
  private _refreshToken: string | null = null;
  private _userId: string | null = null;

  isLoggedIn(): boolean {
    return this._accessToken !== null;
  }

  get accessToken(): string | null {
    return this._accessToken;
  }

  get refreshToken(): string | null {
    return this._refreshToken;
  }

  get userId(): string | null {
    return this._userId;
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
      localStorage.setItem("refreshToken", value);
    } else {
      localStorage.removeItem("refreshToken");
    }
  }

  set userId(value: string | null) {
    this._userId = value;
    if (value !== null) {
      localStorage.setItem("userId", value);
    } else {
      localStorage.removeItem("userId");
    }
  }

  logIn(loginInfo: LoginDTO): Observable<boolean> {
    const headers = new HttpHeaders().set("AuthInterceptorSkip", "");
    const response = this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, loginInfo, {
        headers,
      })
      .pipe(
        tap((response) => {
          this.userId = response.userId;
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
    const headers = new HttpHeaders().set("AuthInterceptorSkip", "");

    const response = this.http
      .post<void>(
        `${environment.apiUrl}/auth/register`,
        {
          email: registerInfo.email,
          password: registerInfo.password,
          username: registerInfo.username,
        },
        { headers }
      )
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

  logOut(): void {
    this.refreshToken = null;
    this.accessToken = null;
    this.userId = null;
  }

  refreshTokens(): Observable<RefreshResponse> {
    const headers = new HttpHeaders().set("AuthInterceptorSkip", "");

    return this.http
      .post<RefreshResponse>(
        `${environment.apiUrl}/auth/refresh`,
        {
          refreshToken: this.refreshToken,
          userId: this.userId,
        },
        { headers }
      )
      .pipe(
        catchError((error) => {
          this.refreshToken = null;
          this.accessToken = null;
          this.userId = null;
          return throwError(() => error);
        }),
        tap((response) => {
          this.refreshToken = response.refreshToken;
          this.accessToken = response.accessToken;
        })
      );
  }
}
