import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { invoke } from "@tauri-apps/api/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    NavbarComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  greetingMessage = "";
  events: string[] = [];
  opened = signal(true);

  toggleSidebar() {
    console.log("CALL");
    this.opened.update((value) => !value);
  }

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();

    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage = text;
    });
  }
}
