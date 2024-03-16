import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  private _loginState = signal(false);

  get loginState(): boolean {
    return this._loginState();
  }

  logIn() {
    this._loginState.set(true);
  }

  logOut() {
    this._loginState.set(false);
  }
}
