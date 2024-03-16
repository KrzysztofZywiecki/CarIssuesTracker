import { Routes } from "@angular/router";
import { IssuesListComponent } from "./components/issues-list/issues-list.component";
import { IssuesSummaryComponent } from "./components/issues-summary/issues-summary.component";
import { AuthComponent } from "./auth/auth/auth.component";
import { authGuard } from "./services/auth-helpers";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

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
    children: [
      { path: "issues", component: IssuesListComponent },
      { path: "summary", component: IssuesSummaryComponent },
      { path: "**", redirectTo: "issues" },
    ],
    canActivate: [authGuard],
  },
  { path: "**", redirectTo: "dashboard" },
];
