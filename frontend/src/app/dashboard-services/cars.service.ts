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

  private _carsSubject: BehaviorSubject<Observable<CarDTO[]> | null> =
    new BehaviorSubject<Observable<CarDTO[]> | null>(null);

  public get carsObservable(): Observable<CarDTO[] | null> {
    return this._carsSubject.asObservable().pipe(
      debounceTime(1000),
      switchMap((value) => {
        if (value != null) {
          return value;
        } else {
          return of(null);
        }
      }),
      shareReplay(1)
    );
  }

  getCars() {
    this._carsSubject.next(
      this._http.get<CarDTO[]>(`${environment.apiUrl}/car/getAll`)
    );
  }

  getCarIssues(carId: string): void {
    this._http.get(`${environment.apiUrl}/car/${carId}`).subscribe((value) => {
      console.log(value);
    });
  }

  createCar(createCarDTO: CreateCarDTO): void {
    this._http
      .post<CarDTO>(`${environment.apiUrl}/car`, createCarDTO)
      .pipe(
        tap((value) => console.log("Created car", value)),
        delay(1000)
      )
      .subscribe(() => {
        this.getCars();
      });
  }

  deleteCar(carId: string): void {
    this._http.delete(`${environment.apiUrl}/car/${carId}`).subscribe(() => {
      this.getCars();
    });
  }
}
