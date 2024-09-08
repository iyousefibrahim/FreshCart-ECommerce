import { Component } from '@angular/core';
import { HomeCarouselComponent } from "../home-carousel/home-carousel.component";
import { CategoriesCarouselComponent } from "../categories-carousel/categories-carousel.component";
import { RouterLink } from '@angular/router';
import { ProductsComponent } from "../products/products.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeCarouselComponent, CategoriesCarouselComponent, RouterLink, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
