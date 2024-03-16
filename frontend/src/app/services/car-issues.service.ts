import { Injectable, Signal, WritableSignal, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CarIssuesService {
  private _issuesList: WritableSignal<number[]> = signal([1, 2, 3]);

  get issuesList(): Signal<number[]> {
    return this._issuesList.asReadonly();
  }

  set issuesList(value: number[]) {
    this._issuesList.set(value);
  }

  constructor() {}
}
