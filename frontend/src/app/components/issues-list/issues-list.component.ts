import { Component, Input, OnInit, Signal } from "@angular/core";
import { CarIssuesService } from "../../dashboard-services/car-issues.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { CarsService } from "../../dashboard-services/cars.service";

@Component({
  selector: "app-issues-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./issues-list.component.html",
  styleUrl: "./issues-list.component.scss",
})
export class IssuesListComponent implements OnInit {
  constructor(
    private issuesService: CarIssuesService,
    private carsService: CarsService
  ) {}

  @Input()
  set id(carId: string) {
    this.carsService.getCarIssues(carId).subscribe(console.log);
  }

  ngOnInit(): void {}
}
