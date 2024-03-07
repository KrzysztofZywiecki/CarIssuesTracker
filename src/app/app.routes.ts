import { Routes } from "@angular/router";
import { IssuesListComponent } from "./components/issues-list/issues-list.component";

export const routes: Routes = [
  { path: "issues", component: IssuesListComponent },
  { path: "**", redirectTo: "issues" },
];
