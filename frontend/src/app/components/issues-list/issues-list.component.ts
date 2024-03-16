import { Component, OnInit, Signal } from "@angular/core";
import { CarIssuesService } from "../../services/car-issues.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-issues-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./issues-list.component.html",
  styleUrl: "./issues-list.component.scss",
})
export class IssuesListComponent implements OnInit {
  issues: Signal<number[]>;
  constructor(private issuesService: CarIssuesService) {
    this.issues = this.issuesService.issuesList;
  }

  ngOnInit(): void {
    console.log(this.issues());
  }
}
