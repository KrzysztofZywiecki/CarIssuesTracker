import { Component, Input } from "@angular/core";
import { MatRippleModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { MatSidenav } from "@angular/material/sidenav";

type NavListitem = {
  label: string;
  icon: string;
  navLink: string;
};

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

  navListItems: NavListitem[] = [
    {
      navLink: "my-fleet",
      icon: "menu",
      label: "My fleet",
    },
    {
      navLink: "summary",
      icon: "directions_car",
      label: "Summary",
    },
    {
      navLink: "profile",
      icon: "account_circle",
      label: "Profile",
    },
  ];

  @Input({ required: true }) sidepanelRef!: MatSidenav;

  logOut() {
    this._authService.logOut().subscribe();
    this._router.navigate(["auth"]);
  }
}
