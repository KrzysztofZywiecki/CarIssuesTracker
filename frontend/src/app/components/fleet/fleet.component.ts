import { Component, OnInit } from "@angular/core";
import { CarsService } from "../../services/cars.service";
import { CarDTO } from "../../models/car-dto";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CreateCarDTO } from "../../models/create-car-dto";

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
  ],
  templateUrl: "./fleet.component.html",
  styleUrl: "./fleet.component.scss",
})
export class FleetComponent implements OnInit {
  constructor(private _carsService: CarsService) {}

  carsObservable: Observable<CarDTO[]> | null = null;

  model: CreateCarDTO = {
    name: "",
  };

  addNew() {
    this._carsService.createCar(this.model);
  }

  ngOnInit(): void {
    this.carsObservable = this._carsService.getCars();
  }
}
