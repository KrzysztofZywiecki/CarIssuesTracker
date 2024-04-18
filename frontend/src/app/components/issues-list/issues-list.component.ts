import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
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
import { CarIssueDTO } from "../../models/car-issue-dto";
import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from "@angular/cdk/layout";

@Component({
  selector: "app-issues-list",
  standalone: true,

  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
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
export class IssuesListComponent implements AfterViewInit, OnChanges {
  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([Breakpoints.XSmall]).subscribe((value) => {
      this.isSmallScreen = !value.matches;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.paginator = this.paginator;
  }

  @Input({ required: true }) set carIssues(carIssues: CarIssueDTO[]) {
    this.dataSource = new MatTableDataSource(carIssues);
  }

  @Output("delete") deletionEvent = new EventEmitter<string>();

  @Output("updateIssue") updateIssueEvent = new EventEmitter<CarIssueDTO>();

  isSmallScreen: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  expandedElement: string | null = null;
  dataSource: MatTableDataSource<CarIssueDTO> = new MatTableDataSource();

  deleteIssue(issueId: string) {
    this.deletionEvent.emit(issueId);
  }

  updateIssue(issue: CarIssueDTO) {
    this.updateIssueEvent.emit(issue);
  }
}
