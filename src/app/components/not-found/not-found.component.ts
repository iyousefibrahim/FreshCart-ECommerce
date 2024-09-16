import { Component } from '@angular/core';
import { NavMainComponent } from "../nav-main/nav-main.component";


@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NavMainComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
