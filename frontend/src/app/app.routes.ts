import { Routes } from "@angular/router";
import { IssuesListComponent } from "./components/issues-list/issues-list.component";
import { IssuesSummaryComponent } from "./components/issues-summary/issues-summary.component";
import { AuthComponent } from "./auth/auth/auth.component";
import { authGuard } from "./services/auth-helpers";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { FleetComponent } from "./components/fleet/fleet.component";
import { CarsService } from "./dashboard-services/cars.service";
import { CarIssuesService } from "./dashboard-services/car-issues.service";

export const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "**", redirectTo: "login" },
    ],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    providers: [CarsService, CarIssuesService],
    children: [
      { path: "my-fleet", component: FleetComponent },
      { path: "issues/:id", component: IssuesListComponent },
      { path: "summary", component: IssuesSummaryComponent },
      { path: "**", redirectTo: "my-fleet" },
    ],
    canActivateChild: [authGuard],
  },
  { path: "**", redirectTo: "dashboard" },
];
