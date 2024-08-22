import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { products } from '../../core/interfaces/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService)
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
