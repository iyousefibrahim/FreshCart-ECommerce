import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { products } from '../../core/interfaces/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productID! : any;
  product! : products;
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService)

  ngOnInit(): void {
    
    this._ActivatedRoute.paramMap.subscribe({
      next:(res)=>{ this.productID = res.get('id');
      }
    });

    this._ProductsService.getProduct(this.productID).subscribe({
      next:(res) => this.product = res.data,
      
    });
  }

}
