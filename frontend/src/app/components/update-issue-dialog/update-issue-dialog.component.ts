import { Component, Inject } from "@angular/core";
import { CarIssueDTO } from "../../models/car-issue-dto";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-update-issue-dialog",
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    TextFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: "./update-issue-dialog.component.html",
  styleUrl: "./update-issue-dialog.component.scss",
})
export class UpdateIssueDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: CarIssueDTO) {
    this.resolved = this.dialogData.resolved;
    this.model = { ...this.dialogData };
    this.model.repairDateTime = new Date(Date.now()).toISOString();
  }

  resolved: boolean;
  model: CarIssueDTO;
}
