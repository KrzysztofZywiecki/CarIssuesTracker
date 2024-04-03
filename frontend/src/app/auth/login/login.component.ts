import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoginDTO } from "../../models/login-dto";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { SnackBarService } from "../../services/snack-bar.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "../auth-styles/style.scss",
})
export class LoginComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBarService: SnackBarService
  ) {}

  loginModel: LoginDTO = { email: "", password: "" };

  logIn() {
    this._authService.logIn(this.loginModel).subscribe((shouldRedirect) => {
      if (!shouldRedirect) {
        this._snackBarService.displaySnackBar("Invalid E-mail or password");
      } else {
        this._router.navigate(["/dashboard"]);
      }
    });
  }
}
