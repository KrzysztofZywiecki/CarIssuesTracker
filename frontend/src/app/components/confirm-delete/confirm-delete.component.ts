import { Component, Inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";

type ConfirmDeleteData = {
  carName: string;
};

@Component({
  selector: "app-confirm-delete",
  standalone: true,
  imports: [MatDialogModule, MatButton],
  templateUrl: "./confirm-delete.component.html",
  styleUrl: "./confirm-delete.component.scss",
})
export class ConfirmDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: ConfirmDeleteData) {
    this.dialogData = this.data;
  }

  dialogData: ConfirmDeleteData;
}
