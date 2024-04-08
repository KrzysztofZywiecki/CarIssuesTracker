import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarsService } from "../../dashboard-services/cars.service";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MatButtonModule } from "@angular/material/button";
import { CarIssuesService } from "../../dashboard-services/car-issues.service";
import { CarIssueDTO } from "../../models/car-issue-dto";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: "app-issues-list",
  standalone: true,

  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: "./issues-list.component.html",
  styleUrl: "./issues-list.component.scss",
  animations: [
    trigger("showInOut", [
      state("in", style({ height: "*" })),
      transition(":enter", [
        style({ height: "0px" }),
        animate("225ms ease-out"),
      ]),
      transition(":leave", [
        animate("225ms ease-out", style({ height: "0px" })),
      ]),
    ]),
  ],
})
export class IssuesListComponent implements OnInit {
  constructor(
    private carsService: CarsService,
    private carIssuesService: CarIssuesService
  ) {}

  @Input()
  set id(carId: string) {
    this.carIssuesService.getCarIssues(carId).subscribe((value) => {
      this.dataSource = new MatTableDataSource(value);
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngAfterViewInit() {
    if (this.dataSource != null) {
      this.dataSource.paginator = this.paginator;
    }
  }

  expandedElement: PeriodicElement | null = null;
  dataSource: MatTableDataSource<CarIssueDTO> = new MatTableDataSource();

  ngOnInit(): void {}
}
