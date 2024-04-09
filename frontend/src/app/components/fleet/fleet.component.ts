import { Component, OnInit, Signal } from "@angular/core";
import { CarsService } from "../../dashboard-services/cars.service";
import { CarDTO } from "../../models/car-dto";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CreateCarDTO } from "../../models/create-car-dto";
import { RouterLink } from "@angular/router";
import { ConfirmCarDeleteComponent } from "../confirm-car-delete/confirm-car-delete.component";
import { Observable, switchMap } from "rxjs";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: "app-fleet",
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatDialogModule,
    MatProgressBarModule,
  ],
  templateUrl: "./fleet.component.html",
  styleUrl: "./fleet.component.scss",
})
export class FleetComponent implements OnInit {
  constructor(private _carsService: CarsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this._carsService.getCars().subscribe((value) => {
      this.carsList = value;
    });
  }

  carsList: CarDTO[] | null = null;

  model: CreateCarDTO = {
    name: "",
  };

  addNew() {
    this._carsService
      .createCar(this.model)
      .pipe(
        switchMap((_) => {
          return this._carsService.getCars();
        })
      )
      .subscribe((value) => {
        this.carsList = value;
      });
  }

  deleteCar(id: string, carName: string) {
    const dialogRef = this.dialog.open(ConfirmCarDeleteComponent, {
      data: { carName },
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (value === true) {
        this.carsList =
          this.carsList?.filter((value) => value.id != id) ?? null;
        this._carsService
          .deleteCar(id)
          .pipe(
            switchMap((_) => {
              return this._carsService.getCars();
            })
          )
          .subscribe((value) => {
            this.carsList = value;
          });
      }
    });
  }
}
