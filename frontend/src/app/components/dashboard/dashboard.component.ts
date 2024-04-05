import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import {
  EventType,
  NavigationEnd,
  Router,
  RouterOutlet,
} from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { Location } from "@angular/common";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    NavbarComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.changeArrowState(this.router.url);
    this.router.events.subscribe((route) => {
      if (route.type === EventType.NavigationEnd) {
        this.changeArrowState(route.url);
      }
    });
  }

  changeArrowState(route: string) {
    if (!!route.split("/").find((x) => x === "issues")) {
      this.showBackArrow = true;
    } else {
      this.showBackArrow = false;
    }
  }

  goBack() {
    this.location.back();
  }

  opened = signal(false);
  showBackArrow: boolean = false;

  getUser() {
    this.http.get(`${environment.apiUrl}/user/info`).subscribe(console.log);
  }

  toggleSidebar() {
    this.opened.update((value) => !value);
  }
}
