import { Component } from "@angular/core";
import { MatRippleModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Directive({
  selector: "[mat-list-item][routerLinkActive]",
  standalone: true,
})
export class RouterActivatedMatListItemDirective implements OnDestroy {
  private subs = new Subscription();

  constructor(matListItem: MatListItem, routerLinkActive: RouterLinkActive) {
    this.subs.add(
      routerLinkActive.isActiveChange.subscribe((isActive) => {
        matListItem.activated = isActive;
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    MatRippleModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatListModule,
    RouterActivatedMatListItemDirective,
  ],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {}

import { Directive, OnDestroy } from "@angular/core";
import { MatListItem } from "@angular/material/list";
import { Subscription } from "rxjs";
