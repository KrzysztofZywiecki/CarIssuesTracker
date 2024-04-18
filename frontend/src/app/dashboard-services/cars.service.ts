import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CarDTO } from "../models/car-dto";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { CreateCarDTO } from "../models/create-car-dto";
import { UpdateCarDTO } from "../models/update-car-dto";

@Injectable()
export class CarsService {
  constructor(private _http: HttpClient) {}

  getCars(): Observable<CarDTO[]> {
    return this._http.get<CarDTO[]>(`${environment.apiUrl}/cars/getAll`);
  }

  getCarInfo(carId: string): Observable<CarDTO> {
    return this._http.get<CarDTO>(`${environment.apiUrl}/cars/${carId}`);
  }

  createCar(createCarDTO: CreateCarDTO): Observable<CarDTO> {
    return this._http.post<CarDTO>(`${environment.apiUrl}/cars`, createCarDTO);
  }

  deleteCar(carId: string): Observable<void> {
    return this._http.delete<void>(`${environment.apiUrl}/cars/${carId}`);
  }

  updateCarInfo(carId: string, updateCarDTO: UpdateCarDTO) {
    return this._http.put<CarDTO>(
      `${environment.apiUrl}/cars/${carId}`,
      updateCarDTO
    );
  }
}
