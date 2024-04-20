import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-confirm-delete-secure",
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: "./confirm-delete-secure.component.html",
  styleUrl: "./confirm-delete-secure.component.scss",
})
export class ConfirmDeleteSecureComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: string) {
    this.dialogMessage = this.data;
  }

  dialogMessage: string;
  password: string = "";
}
