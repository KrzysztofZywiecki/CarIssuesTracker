import { Component, Input, OnDestroy } from "@angular/core";
import { CarSummaryEntry } from "../../models/car-summary-dto";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-summary-table",
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: "./summary-table.component.html",
  styleUrl: "./summary-table.component.scss",
})
export class SummaryTableComponent {
  constructor() {}

  @Input({ required: true }) data: CarSummaryEntry[] | null = null;
}
