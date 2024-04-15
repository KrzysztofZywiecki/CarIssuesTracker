import { Component, computed } from "@angular/core";
import { CreateCarDTO } from "../../models/create-car-dto";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatOptionModule } from "@angular/material/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { carManufacturers } from "../../models/car-manufacturers";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-add-new-car-dialog",
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatButtonModule,
  ],
  templateUrl: "./add-new-car-dialog.component.html",
  styleUrl: "./add-new-car-dialog.component.scss",
})
export class AddNewCarDialogComponent {
  createCarDTO: CreateCarDTO = new CreateCarDTO();
  manufacturers = carManufacturers;

  get filteredManufacturers(): string[] {
    return this._filter(this.createCarDTO.manufacturer);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.manufacturers.filter((manufacturer) =>
      manufacturer.toLowerCase().includes(filterValue)
    );
  }
}
