import { Component, OnInit, ViewChild } from "@angular/core";
import { CarSummaryService } from "../../dashboard-services/car-summary.service";
import { CarsService } from "../../dashboard-services/cars.service";
import { CommonModule } from "@angular/common";
import { Observable, forkJoin, map, switchMap } from "rxjs";
import { CarSummaryDTO } from "../../models/car-summary-dto";

import { ChartComponent } from "ng-apexcharts";
import { SummaryPlotComponent } from "../summary-plot/summary-plot.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { SummaryTableComponent } from "../summary-table/summary-table.component";
import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { CarDTO } from "../../models/car-dto";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "app-issues-summary",
  standalone: true,
  templateUrl: "./issues-summary.component.html",
  styleUrl: "./issues-summary.component.scss",
  imports: [
    CommonModule,
    SummaryPlotComponent,
    MatProgressBarModule,
    SummaryTableComponent,
    MatExpansionModule,
  ],
})
export class IssuesSummaryComponent implements OnInit {
  constructor(
    private _carSummaryService: CarSummaryService,
    private _carsService: CarsService,
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([Breakpoints.XSmall]).subscribe((value) => {
      this.isSmallScreen = !value.matches;
    });
  }

  isSmallScreen: boolean = false;

  @ViewChild("chart") chart!: ChartComponent;

  cars: Observable<
    { total: number; monthly: CarSummaryDTO; carInfo: CarDTO }[]
  > | null = null;

  ngOnInit(): void {
    this.cars = this._carsService.getCars().pipe(
      switchMap((values) => {
        return forkJoin(
          values.map((car) =>
            forkJoin({
              total: this._carSummaryService.getTotalSpendingForCar(car.id),
              monthly: this._carSummaryService.getMonthlySpendingForCar(car.id),
            }).pipe(
              map((value) => {
                return { ...value, carInfo: car };
              })
            )
          )
        );
      })
    );
  }
}
