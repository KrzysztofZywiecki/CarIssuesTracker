import { Component, OnInit } from "@angular/core";
import { UserInfoService } from "../../dashboard-services/user-info.service";
import { UserDTO } from "../../models/user-dto";
import { Observable, merge, of } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { UpdateProfileDialogComponent } from "../update-profile-dialog/update-profile-dialog.component";
import { ConfirmDeleteComponent } from "../confirm-delete/confirm-delete.component";
import { ChangePasswordDialogComponent } from "../change-password-dialog/change-password-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { ConfirmDeleteSecureComponent } from "../confirm-delete-secure/confirm-delete-secure.component";
import { SnackBarService } from "../../services/snack-bar.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent implements OnInit {
  constructor(
    private _userInfoService: UserInfoService,
    private dialogService: MatDialog,
    private snackbarService: SnackBarService,
    private authService: AuthService,
    private router: Router
  ) {}

  userInfo: UserDTO | null = null;

  ngOnInit(): void {
    this._userInfoService.getUserInfo().subscribe((value) => {
      this.userInfo = value;
    });
  }

  updateProfile() {
    const dialogRef = this.dialogService.open(UpdateProfileDialogComponent, {
      data: this.userInfo,
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (!!value) {
        this._userInfoService.updateUserInfo(value).subscribe((value) => {
          this.userInfo = value;
        });
      }
    });
  }
  deleteAccount() {
    const dialogRef = this.dialogService.open(ConfirmDeleteSecureComponent, {
      data: "Are you sure you want to delete your account? This operation cannot be undone!",
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (!!value) {
        this._userInfoService.deleteAccount(value).subscribe({
          next: (response) => {
            this.authService.logOut();
            this.router.navigate(["auth"]);
          },
          error: (err) => {
            this.snackbarService.displaySnackBar("Incorrect password");
          },
        });
      }
    });
  }
  changePassword() {
    const dialogRef = this.dialogService.open(ChangePasswordDialogComponent);
    dialogRef.afterClosed().subscribe((value) => {
      if (!!value) {
        this._userInfoService.changePassword(value).subscribe({
          next: (response) => {
            this.snackbarService.displaySnackBar(
              "Password changed successfully"
            );
          },
          error: (error) => {
            this.snackbarService.displaySnackBar("Failed to change password");
          },
        });
      }
    });
  }
}
