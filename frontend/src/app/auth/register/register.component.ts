import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterLink } from "@angular/router";
import { RegisterDTO } from "../../models/register-dto";
import { MatchingPasswordsDirective } from "../helpers/matching-passwords.directive";
import { AuthService } from "../../services/auth.service";
import { LoginDTO } from "../../models/login-dto";
import { firstValueFrom, of, switchMap } from "rxjs";
import { SnackBarService } from "../../services/snack-bar.service";
import { MatSelectModule } from "@angular/material/select";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatchingPasswordsDirective,
    MatSelectModule,
    MatIcon,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "../auth-styles/style.scss",
})
export class RegisterComponent {
  constructor(
    private _authService: AuthService,
    private _snackBarService: SnackBarService,
    private _router: Router
  ) {}
  registerModel: RegisterDTO = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  };

  register() {
    this._authService.register(this.registerModel).subscribe((response) => {
      if (response.status === 0) {
        const logInInfo: LoginDTO = {
          email: this.registerModel.email,
          password: this.registerModel.password,
        };

        this._authService.logIn(logInInfo).subscribe((shouldRedirect) => {
          if (!shouldRedirect) {
            this._snackBarService.displaySnackBar("Invalid E-mail or password");
          } else {
            this._router.navigate(["/dashboard"]);
          }
        });
      } else {
        this._snackBarService.displaySnackBar(response.messages.join(" "));
      }
    });
  }
}
