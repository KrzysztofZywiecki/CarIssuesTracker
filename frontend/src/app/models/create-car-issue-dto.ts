export class CreateCarIssueDTO {
  title: string = "";
  description: string = "";
  createDateTime: string = new Date(Date.now()).toISOString();
}
