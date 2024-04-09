import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: "app-edit-car-dialog",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: "./edit-car-dialog.component.html",
  styleUrl: "./edit-car-dialog.component.scss",
})
export class EditCarDialogComponent {}
