import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  @Input()
  title = "Footer";

  @Output()
  titleClick = new EventEmitter<NavbarComponent>();
}
