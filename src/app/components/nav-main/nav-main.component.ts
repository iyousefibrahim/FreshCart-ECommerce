import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.scss'
})
export class NavMainComponent {
  
  _AuthService = inject(AuthService);
}
