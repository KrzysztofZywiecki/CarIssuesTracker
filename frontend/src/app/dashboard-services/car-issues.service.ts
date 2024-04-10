import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { CarIssueDTO } from "../models/car-issue-dto";
import { CreateCarIssueDTO } from "../models/create-car-issue-dto";
import { UpdateCarIssueDTO } from "../models/update-car-issue-dto";

@Injectable()
export class CarIssuesService {
  constructor(private _http: HttpClient) {}

  getCarIssues(carId: string): Observable<any> {
    return this._http.get<CarIssueDTO>(
      `${environment.apiUrl}/cars/${carId}/issues`
    );
  }

  createCarIssue(
    carId: string,
    createCarIssueDTO: CreateCarIssueDTO
  ): Observable<CarIssueDTO> {
    return this._http.post<CarIssueDTO>(
      `${environment.apiUrl}/cars/${carId}/issues`,
      createCarIssueDTO
    );
  }

  removeCarIssue(carId: string, issueId: string): Observable<void> {
    return this._http.delete<void>(
      `${environment.apiUrl}/cars/${carId}/issues/${issueId}`
    );
  }

  updateCarIssue(
    carId: string,
    issueId: string,
    carIssueDTO: UpdateCarIssueDTO
  ) {
    return this._http.put<CarIssueDTO>(
      `${environment.apiUrl}/cars/${carId}/issues/${issueId}`,
      carIssueDTO
    );
  }
}
