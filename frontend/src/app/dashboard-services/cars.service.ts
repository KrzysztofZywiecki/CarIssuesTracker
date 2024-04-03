import { HttpClient } from "@angular/common/http";
import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { CarDTO } from "../models/car-dto";
import { Observable, of } from "rxjs";
import { environment } from "../../environments/environment.development";
import { CarIssueDTO } from "../models/car-issue-dto";
import { CreateCarDTO } from "../models/create-car-dto";

@Injectable()
export class CarsService {
  constructor(private _http: HttpClient) {
    this.getCars();
  }

  private _cars: WritableSignal<CarDTO[] | null> = signal(null);

  public get cars(): Signal<CarDTO[] | null> {
    return this._cars.asReadonly();
  }

  public set cars(value: CarDTO[] | null) {
    if (value === null) {
      this._cars.set(null);
    } else {
      this._cars.set([...value]);
    }
  }

  private getCars() {
    this._http
      .get<CarDTO[]>(`${environment.apiUrl}/car/getAll`)
      .subscribe((value) => {
        this.cars = value;
      });
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
