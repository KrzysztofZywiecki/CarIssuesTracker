import { Component, Inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-issue-delete",
  standalone: true,
  imports: [MatDialogModule, MatButton],
  templateUrl: "./confirm-issue-delete.component.html",
  styleUrl: "./confirm-issue-delete.component.scss",
})
export class ConfirmIssueDeleteComponent {
  constructor() {}
}
