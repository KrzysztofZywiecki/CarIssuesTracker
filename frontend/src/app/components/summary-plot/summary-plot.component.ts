import { Component, Input, OnInit, ViewChild, input } from "@angular/core";
import { CarSummaryEntry } from "../../models/car-summary-dto";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-summary-plot",
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: "./summary-plot.component.html",
  styleUrl: "./summary-plot.component.scss",
})
export class SummaryPlotComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "Total monthly cost",
          data: this.getData(),
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false },
      },
      title: {
        text: "Costs chart",
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value.toFixed(2) + "$";
          },
        },
      },
      xaxis: {
        type: "datetime",
      },
    };
  }

  @Input({ required: true }) data: CarSummaryEntry[] | null = null;

  @ViewChild("chart") chart!: ChartComponent;

  getData() {
    const data = this.data!.map((element) => {
      let x = this.formatDate(new Date(element.month));
      return { x, y: element.totalCost };
    });

    const dates = this.data!.map((element) => Date.parse(element.month));

    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    let [minYear, minMonth] = [minDate.getFullYear(), minDate.getMonth()];
    let [maxYear, maxMonth] = [maxDate.getFullYear(), maxDate.getMonth()];

    const datapoints = [];
    while ((minYear === maxYear && minMonth <= maxMonth) || minYear < maxYear) {
      const newDate = this.formatDate(new Date(minYear, minMonth, 1));
      const existingElement = data.find((element) => element.x === newDate);
      if (!!existingElement) {
        datapoints.push({
          x: new Date(minYear, minMonth, 2),
          y: existingElement.y,
        });
      } else {
        datapoints.push({ x: new Date(minYear, minMonth, 2), y: 0 });
      }
      minMonth += 1;
      if (minMonth === 12) {
        minMonth = 0;
        minYear += 1;
      }
    }

    return datapoints;
  }

  formatDate(date: Date) {
    return `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")} ${date.getFullYear()}`;
  }

  public chartOptions: ChartOptions | null = null;
}
