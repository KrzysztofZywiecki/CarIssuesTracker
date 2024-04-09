export class CarIssueDTO {
  id: string = "";
  title: string = "";
  description: string = "";
  createDateTime: string = new Date(Date.now()).toISOString();
  repairDateTime: string | null = null;
  resolved: boolean = false;
  repairCost: number | null = null;
}
