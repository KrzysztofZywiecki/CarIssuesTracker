import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CarSummaryDTO } from "../models/car-summary-dto";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class CarSummaryService {
  constructor(private _http: HttpClient) {}

  getSummaryForCar(carId: string): Observable<CarSummaryDTO> {
    return this._http.get<CarSummaryDTO>(
      `${environment.apiUrl}/summary/${carId}`
    );
  }
}
