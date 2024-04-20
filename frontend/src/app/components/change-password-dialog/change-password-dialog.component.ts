import { Component } from "@angular/core";
import { ChangePasswordModel } from "../../models/change-password-model";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-change-password-dialog",
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: "./change-password-dialog.component.html",
  styleUrl: "./change-password-dialog.component.scss",
})
export class ChangePasswordDialogComponent {
  constructor() {}

  public model: ChangePasswordModel = new ChangePasswordModel();
}
