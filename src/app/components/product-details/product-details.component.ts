import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { products } from '../../core/interfaces/product';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productID!: any;
  product!: any;
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  AddProductToCart(product_id: any) {
    this._CartService.AddProductToCart(product_id).subscribe({
      next: (res) => {
        this._ToastrService.success('Product added successfully to cart!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
      },
    })
  }

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productID = res.get('id');
      }
    });

    this._ProductsService.getProduct(this.productID).subscribe({
      next: (res) => this.product = res.data,

    });
  }

}
