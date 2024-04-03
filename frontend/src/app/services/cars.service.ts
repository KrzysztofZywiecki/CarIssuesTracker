import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CarDTO } from "../models/car-dto";
import { Observable, of } from "rxjs";
import { environment } from "../../environments/environment.development";
import { CarIssueDTO } from "../models/car-issue-dto";
import { CreateCarDTO } from "../models/create-car-dto";

@Injectable({
  providedIn: "root",
})
export class CarsService {
  constructor(private _http: HttpClient) {}

  getCars(): Observable<CarDTO[]> {
    return this._http.get<CarDTO[]>(`${environment.apiUrl}/car/getAll`);
  }

  getCarIssues(): Observable<CarIssueDTO> {
    throw "Not implemented";
  }

  createCar(createCarDTO: CreateCarDTO) {
    return this._http
      .post<CarDTO>(`${environment.apiUrl}/car`, createCarDTO)
      .subscribe((value) => {
        console.log(value);
      });
  }
}
