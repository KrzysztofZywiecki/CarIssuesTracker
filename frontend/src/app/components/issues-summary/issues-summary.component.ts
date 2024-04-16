import { Component, OnInit, ViewChild } from "@angular/core";
import { CarSummaryService } from "../../dashboard-services/car-summary.service";
import { CarsService } from "../../dashboard-services/cars.service";
import { CommonModule } from "@angular/common";
import { Observable, forkJoin, map, switchMap } from "rxjs";
import { CarSummaryDTO, CarSummaryEntry } from "../../models/car-summary-dto";

import { ChartComponent } from "ng-apexcharts";
import { SummaryPlotComponent } from "../summary-plot/summary-plot.component";

@Component({
  selector: "app-issues-summary",
  standalone: true,
  templateUrl: "./issues-summary.component.html",
  styleUrl: "./issues-summary.component.scss",
  imports: [CommonModule, SummaryPlotComponent],
})
export class IssuesSummaryComponent implements OnInit {
  constructor(
    private _carSummaryService: CarSummaryService,
    private _carsService: CarsService
  ) {}

  @ViewChild("chart") chart!: ChartComponent;

  cars: Observable<CarSummaryDTO[]> | null = null;

  ngOnInit(): void {
    this.cars = this._carsService.getCars().pipe(
      switchMap((values) => {
        return forkJoin(
          values.map((car) => this._carSummaryService.getSummaryForCar(car.id))
        );
      })
    );
  }
}
