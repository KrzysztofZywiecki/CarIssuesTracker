import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDTO } from "../models/user-dto";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class UserInfoService {
  constructor(private _http: HttpClient) {}

  getUserInfo(): Observable<UserDTO> {
    return this._http.get<UserDTO>(`${environment.apiUrl}/user`);
  }
}
