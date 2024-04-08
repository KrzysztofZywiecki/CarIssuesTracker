import { HttpClient } from "@angular/common/http";
import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { CarDTO } from "../models/car-dto";
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  delay,
  of,
  shareReplay,
  switchMap,
  tap,
} from "rxjs";
import { environment } from "../../environments/environment.development";
import { CreateCarDTO } from "../models/create-car-dto";

@Injectable()
export class CarsService {
  constructor(private _http: HttpClient) {}

  getCars(): Observable<CarDTO[]> {
    return this._http.get<CarDTO[]>(`${environment.apiUrl}/car/getAll`);
  }

  createCar(createCarDTO: CreateCarDTO): Observable<void> {
    return this._http.post<void>(`${environment.apiUrl}/car`, createCarDTO);
  }

  deleteCar(carId: string): Observable<void> {
    return this._http.delete<void>(`${environment.apiUrl}/car/${carId}`);
  }
}
