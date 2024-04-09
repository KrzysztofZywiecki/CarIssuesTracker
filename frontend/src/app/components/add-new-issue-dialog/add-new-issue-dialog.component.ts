import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { CreateCarIssueDTO } from "../../models/create-car-issue-dto";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { TextFieldModule } from "@angular/cdk/text-field";

@Component({
  selector: "app-add-new-issue-dialog",
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    TextFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: "./add-new-issue-dialog.component.html",
  styleUrl: "./add-new-issue-dialog.component.scss",
})
export class AddNewIssueDialogComponent {
  issueDTO = new CreateCarIssueDTO();
}
