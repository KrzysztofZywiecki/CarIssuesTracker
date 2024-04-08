import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { CarIssueDTO } from "../models/car-issue-dto";

@Injectable()
export class CarIssuesService {
  constructor(private _http: HttpClient) {}

  getCarIssues(carId: string): Observable<any> {
    return this._http.get<CarIssueDTO>(`${environment.apiUrl}/issues/${carId}`);
  }
}
