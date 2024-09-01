import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { products } from '../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ProductStockPipe } from '../../core/pipes/product-stock.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,CurrencyPipe,ProductStockPipe,NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  allProducts: products[] = [];

  getProducts() {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data
      }
    })
  }

  AddProductToCart(product_id: any) {
    this._CartService.AddProductToCart(product_id).subscribe({
      next: (res) => {
        this._ToastrService.success('Product added successfully to your cart!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
      },
    })
  }



  ngOnInit(): void {
    this.getProducts();
  }
}
