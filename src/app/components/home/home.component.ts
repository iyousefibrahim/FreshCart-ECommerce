import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { products } from '../../core/interfaces/product';
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
export class HomeComponent implements OnInit {

  private readonly _ProductsService = inject(ProductsService);
  allProducts: products[] = [];
  getProducts() {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data
      }
    })
  }

  ngOnInit(): void {

    this.getProducts();
  }
}
