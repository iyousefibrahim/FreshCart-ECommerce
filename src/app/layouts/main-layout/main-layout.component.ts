import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMainComponent } from "../../components/nav-main/nav-main.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavMainComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  upbtn: boolean = false;

  scrolltoTop() {
    window.scrollTo({ top: 0 });
  }

  @HostListener('window:scroll') ScrollTop() {
    if (window.scrollY > 300) {
      this.upbtn = true;
    } else {
      this.upbtn = false;
    }
  }
}
