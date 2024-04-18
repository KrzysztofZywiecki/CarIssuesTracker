import { Component, Input } from "@angular/core";
import { CarIssuesService } from "../../dashboard-services/car-issues.service";
import { CarsService } from "../../dashboard-services/cars.service";
import { CarDTO } from "../../models/car-dto";
import { CarIssueDTO } from "../../models/car-issue-dto";
import { CommonModule } from "@angular/common";
import { IssuesListComponent } from "../issues-list/issues-list.component";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { EditCarDialogComponent } from "../edit-car-dialog/edit-car-dialog.component";
import { AddNewIssueDialogComponent } from "../add-new-issue-dialog/add-new-issue-dialog.component";
import { UpdateIssueDialogComponent } from "../update-issue-dialog/update-issue-dialog.component";
import { UpdateCarIssueDTO } from "../../models/update-car-issue-dto";
import { ConfirmDeleteComponent } from "../confirm-car-delete/confirm-delete.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: "app-car-issues",
  standalone: true,
  templateUrl: "./car-issues.component.html",
  styleUrl: "./car-issues.component.scss",
  imports: [CommonModule, IssuesListComponent, MatButton, MatProgressBarModule],
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
  carIssues: Array<CarIssueDTO> | null = null;

  openCarEditDialog() {
    const dialogHandle = this.dialogService.open(EditCarDialogComponent, {
      data: this.carInfo,
    });
    dialogHandle.afterClosed().subscribe((value) => {
      if (!!value) {
        this.carsService
          .updateCarInfo(this.carId, value)
          .subscribe((newCar) => {
            this.carInfo = newCar;
          });
      }
    });
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

  showUpdateIssueDialog(issue: CarIssueDTO) {
    const dialogRef = this.dialogService.open(UpdateIssueDialogComponent, {
      data: issue,
    });
    dialogRef.afterClosed().subscribe((carIssueDTO: CarIssueDTO | null) => {
      if (!!carIssueDTO) {
        this.carIssuesService
          .updateCarIssue(
            this.carId,
            issue.id,
            Object.assign(new UpdateCarIssueDTO(), carIssueDTO)
          )
          .subscribe((value) => {
            this.carIssues = this.carIssues!.reduce((previous, current) => {
              if (current.id === value.id) {
                previous.push(value);
              } else {
                previous.push(current);
              }
              return previous;
            }, [] as CarIssueDTO[]);
          });
      }
    });
  }

  deleteIssue(issueId: string) {
    const dialogRef = this.dialogService.open(ConfirmDeleteComponent, {
      data: "Are you sure you want to delete selected issue?",
    });
    dialogRef.afterClosed().subscribe((shouldDelete) => {
      if (shouldDelete) {
        this.carIssuesService
          .removeCarIssue(this.carId, issueId)
          .subscribe((_) => {});
        this.carIssues =
          this.carIssues?.filter((carIssue) => carIssue.id != issueId) ?? null;
      }
    });
  }
}
