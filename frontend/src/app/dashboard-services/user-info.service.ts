import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { UserDTO } from "../models/user-dto";
import { environment } from "../../environments/environment.development";
import { AuthService } from "../services/auth.service";
import { ChangePasswordModel } from "../models/change-password-model";
import { ChangePasswordDTO } from "../models/change-password-dto";

@Injectable({
  providedIn: "root",
})
export class UserInfoService {
  constructor(private _http: HttpClient, private _authService: AuthService) {}

  getUserInfo(): Observable<UserDTO> {
    return this._http.get<UserDTO>(`${environment.apiUrl}/user`);
  }

  deleteAccount(password: string): Observable<void> {
    return this._http.delete<void>(`${environment.apiUrl}/user`, {
      headers: { AuthInterceptorSkip: "" },
      params: { password },
    });
  }

  updateUserInfo(model: UserDTO): Observable<UserDTO> {
    return this._http.put<UserDTO>(`${environment.apiUrl}/user`, model);
  }

  changePassword(model: ChangePasswordModel): Observable<void> {
    let dto: ChangePasswordDTO = new ChangePasswordDTO();
    if (model.newPassword === model.repeatPassword) {
      dto = { newPassword: model.newPassword, oldPassword: model.oldPassword };
      return this._http.post<void>(
        `${environment.apiUrl}/user/changePassword`,
        dto,
        { headers: { AuthInterceptorSkip: "" } }
      );
    } else {
      return throwError(() => "Passwords don't match");
    }
  }
}
