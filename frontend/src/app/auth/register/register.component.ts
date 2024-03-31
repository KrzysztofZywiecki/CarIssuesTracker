import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterLink } from "@angular/router";
import { RegisterDto } from "../../models/register-dto";
import { MatchingPasswordsDirective } from "../helpers/matching-passwords.directive";
import { AuthService } from "../../services/auth.service";

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
  ],
  templateUrl: "./register.component.html",
  styleUrl: "../auth-styles/style.scss",
})
export class RegisterComponent {
  constructor(private _authService: AuthService) {}
  registerModel: RegisterDto = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  register() {
    this._authService.register(this.registerModel).subscribe(console.log);
  }
}
