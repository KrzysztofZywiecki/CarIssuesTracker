import { Component, OnInit } from "@angular/core";
import { UserInfoService } from "../../dashboard-services/user-info.service";
import { UserDTO } from "../../models/user-dto";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent implements OnInit {
  constructor(private _userInfoService: UserInfoService) {}

  userInfo: Observable<UserDTO> | null = null;

  ngOnInit(): void {
    this.userInfo = this._userInfoService.getUserInfo();
  }
}
