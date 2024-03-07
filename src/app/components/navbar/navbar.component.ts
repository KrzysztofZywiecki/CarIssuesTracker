import { Component } from "@angular/core";
import { MatRipple, MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [MatRippleModule, MatIconModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {}
