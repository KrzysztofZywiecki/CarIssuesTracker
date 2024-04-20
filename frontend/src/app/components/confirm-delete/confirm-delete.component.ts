import { Component, Inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-delete",
  standalone: true,
  imports: [MatDialogModule, MatButton],
  templateUrl: "./confirm-delete.component.html",
  styleUrl: "./confirm-delete.component.scss",
})
export class ConfirmDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: string) {
    this.dialogMessage = this.data;
  }

  dialogMessage: string;
}
