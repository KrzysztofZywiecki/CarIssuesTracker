import { Component, Inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";

type ConfirmCarDeleteData = {
  carName: string;
};

@Component({
  selector: "app-confirm-car-delete",
  standalone: true,
  imports: [MatDialogModule, MatButton],
  templateUrl: "./confirm-car-delete.component.html",
  styleUrl: "./confirm-car-delete.component.scss",
})
export class ConfirmCarDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: ConfirmCarDeleteData) {
    this.dialogData = this.data;
  }

  dialogData: ConfirmCarDeleteData;
}
