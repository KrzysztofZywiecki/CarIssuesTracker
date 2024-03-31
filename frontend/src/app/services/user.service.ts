import { Injectable, Signal, signal } from "@angular/core";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly _user = signal<User | null>(null);

  public get user(): Signal<User | null> {
    return this._user.asReadonly();
  }

  public setUser(value: User | null) {
    this._user.set(value);
  }

  public getUser(id: number): Observable<User> {
    return this._http.get<User>(`${environment.apiUrl}/user/${id}`);
  }

  constructor(private _http: HttpClient) {}
}
