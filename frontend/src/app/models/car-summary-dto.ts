export class CarSummaryDTO {
  carId: string = "";
  summaryEntries: CarSummaryEntry[] = [];
}

export class CarSummaryEntry {
  month: string = "";
  totalCost: number = 0;
}
