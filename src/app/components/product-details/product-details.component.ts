import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { products } from '../../core/interfaces/product';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [TranslateModule],
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
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  

  AddProductToCart(product_id: any) {
    this._CartService.AddProductToCart(product_id).subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
        this._ToastrService.success('Product added successfully to cart!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
      },
    })
  }

  change(lang: string) {
    this._MyTranslateService.changeLang(lang);
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
