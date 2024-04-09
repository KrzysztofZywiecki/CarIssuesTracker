import { Component, Input } from "@angular/core";
import { CarIssuesService } from "../../dashboard-services/car-issues.service";
import { CarsService } from "../../dashboard-services/cars.service";
import { CarDTO } from "../../models/car-dto";
import { CarIssueDTO } from "../../models/car-issue-dto";
import { CommonModule } from "@angular/common";
import { IssuesListComponent } from "../issues-list/issues-list.component";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDeleteComponent } from "../confirm-delete/confirm-delete.component";
import { EditCarDialogComponent } from "../edit-car-dialog/edit-car-dialog.component";
import { AddNewIssueDialogComponent } from "../add-new-issue-dialog/add-new-issue-dialog.component";

@Component({
  selector: "app-car-issues",
  standalone: true,
  templateUrl: "./car-issues.component.html",
  styleUrl: "./car-issues.component.scss",
  imports: [CommonModule, IssuesListComponent, MatButton],
})
export class CarIssuesComponent {
  constructor(
    private carIssuesService: CarIssuesService,
    private carsService: CarsService,
    private dialogService: MatDialog
  ) {}

  @Input()
  set id(carId: string) {
    this.carId = carId;
    this.carsService.getCarInfo(carId).subscribe((value) => {
      this.carInfo = value;
    });
    this.carIssuesService.getCarIssues(carId).subscribe((value) => {
      this.carIssues = value;
    });
  }

  carId: string = "";
  carInfo: CarDTO | null = null;
  carIssues: CarIssueDTO[] | null = null;

  openCarEditDialog() {
    this.dialogService.open(EditCarDialogComponent);
  }

  openAddIssueDialog() {
    const dialogHandle = this.dialogService.open(AddNewIssueDialogComponent);
    dialogHandle.afterClosed().subscribe((value) => {
      if (!!value) {
        this.carIssuesService
          .createCarIssue(this.carId, value)
          .subscribe((newItem) => {
            this.carIssues = [...(this.carIssues ?? []), newItem];
          });
      }
    });
  }
}
