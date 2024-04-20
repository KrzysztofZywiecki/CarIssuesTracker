import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { UserDTO } from "../../models/user-dto";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-update-profile-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: "./update-profile-dialog.component.html",
  styleUrl: "./update-profile-dialog.component.scss",
})
export class UpdateProfileDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: UserDTO) {
    this.model = new UserDTO();
    this.model = { ...this.dialogData };
  }

  model: UserDTO;
}
