import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService
  ) {}

  logIn() {
    this._userService.getUser(1).subscribe({
      next: (value) => {
        this._userService.setUser(value);
        this._authService.logIn();
        this._router.navigate(["/dashboard"]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
