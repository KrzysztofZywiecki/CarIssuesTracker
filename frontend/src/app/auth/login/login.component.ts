import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoginDto } from "../../models/login-dto";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

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
    MatSnackBarModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "../auth-styles/style.scss",
})
export class LoginComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  loginModel: LoginDto = { email: "", password: "" };

  logIn() {
    this._authService.logIn(this.loginModel).subscribe((shouldRedirect) => {
      if (!shouldRedirect) {
        const snackbarRef = this._snackBar.open("Invalid E-mail or password");
        snackbarRef._dismissAfter(5000);
      } else {
        this._router.navigate(["/dashboard"]);
      }
    });
  }
}
