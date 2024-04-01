import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  constructor(private _snackBarService: MatSnackBar) {}

  displaySnackBar(message: string) {
    const snackbarRef = this._snackBarService.open(message);
    snackbarRef._dismissAfter(5000);
  }
}
