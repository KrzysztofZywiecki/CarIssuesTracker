import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { UpdateCarDTO } from "../../models/update-car-dto";
import { CarDTO } from "../../models/car-dto";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { carManufacturers } from "../../models/car-manufacturers";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-edit-car-dialog",
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
  ],
  templateUrl: "./edit-car-dialog.component.html",
  styleUrl: "./edit-car-dialog.component.scss",
})
export class EditCarDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) dialogData: CarDTO) {
    this.model = new UpdateCarDTO();
    this.model = { ...dialogData };
  }

  model: UpdateCarDTO;
  manufacturers = carManufacturers;

  get filteredManufacturers(): string[] {
    const filterValue = this.model.manufacturer.toLowerCase();

    return this.manufacturers.filter((manufacturer) =>
      manufacturer.toLowerCase().includes(filterValue)
    );
  }
}
