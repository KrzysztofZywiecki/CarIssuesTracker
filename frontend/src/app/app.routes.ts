import { Routes } from "@angular/router";
import { IssuesSummaryComponent } from "./components/issues-summary/issues-summary.component";
import { AuthComponent } from "./auth/auth/auth.component";
import { authGuard } from "./services/auth-helpers";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { FleetComponent } from "./components/fleet/fleet.component";
import { CarsService } from "./dashboard-services/cars.service";
import { CarIssuesService } from "./dashboard-services/car-issues.service";
import { ProfileComponent } from "./components/profile/profile.component";
import { CarIssuesComponent } from "./components/car-issues/car-issues.component";

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
      { path: "issues/:id", component: CarIssuesComponent },
      { path: "summary", component: IssuesSummaryComponent },
      { path: "profile", component: ProfileComponent },
      { path: "**", redirectTo: "my-fleet" },
    ],
    canActivateChild: [authGuard],
  },
  { path: "**", redirectTo: "dashboard" },
];
