import { Component } from "@angular/core";
import { MatRippleModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    MatRippleModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatListModule,
  ],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
  constructor(private _authService: AuthService, private _router: Router) {}

  logOut() {
    this._authService.logOut().subscribe((_) => {
      this._router.navigate(["auth"]);
    });
  }
}
