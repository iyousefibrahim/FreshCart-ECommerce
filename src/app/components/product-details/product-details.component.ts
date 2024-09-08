import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productID!: any;
  product!: any;

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  private activatedRouteSub!: Subscription;
  private productSub!: Subscription;
  private addProductToCartSub!: Subscription;

  AddProductToCart(product_id: any) {
    this.addProductToCartSub = this._CartService.AddProductToCart(product_id).subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
        this._ToastrService.success('Product added successfully to cart!', '', {
          progressBar: true,
          progressAnimation: 'increasing',
        });
      },
    });
  }

  change(lang: string) {
    this._MyTranslateService.changeLang(lang);
  }

  ngOnInit(): void {
    this.activatedRouteSub = this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productID = res.get('id');
      },
    });

    this.productSub = this._ProductsService.getProduct(this.productID).subscribe({
      next: (res) => (this.product = res.data),
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteSub?.unsubscribe();
    this.productSub?.unsubscribe();
    this.addProductToCartSub?.unsubscribe();
  }
}
