export class UpdateCarIssueDTO {
  title: string = "";
  description: string = "";
  createDateTime: number = Date.now();
  repairDateTime: number | null = null;
  repairCost: number = 0;
}
