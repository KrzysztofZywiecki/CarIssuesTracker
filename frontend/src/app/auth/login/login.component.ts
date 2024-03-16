import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  constructor(private _authService: AuthService, private _router: Router) {}

  logIn() {
    this._authService.logIn();
    this._router.navigate(["/dashboard"]);
  }
}
