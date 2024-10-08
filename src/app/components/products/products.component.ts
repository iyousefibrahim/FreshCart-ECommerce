import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { products } from '../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ProductStockPipe } from '../../core/pipes/product-stock.pipe';
import { WishlistService } from '../../core/services/wishlist.service';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, ProductStockPipe, NgClass, SearchPipe, FormsModule, TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  allProducts: products[] = [];
  ProductIds = new Set<string>();
  text: string = "";

  private productsSub!: Subscription;
  private addToCartSub!: Subscription;
  private addToWishlistSub!: Subscription;
  private getWishlistSub!: Subscription;
  private removeFromWishlistSub!: Subscription;

  getProducts() {
    this.productsSub = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data ?? [];
      }
    });
  }

  AddProductToCart(product_id: any) {
    this.addToCartSub = this._CartService.AddProductToCart(product_id).subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
        this._ToastrService.success('Product added successfully to your cart!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
      },
    });
  }

  AddProductToWishList(productId: any) {
    this.addToWishlistSub = this._WishlistService.AddProductToWishlist(productId).subscribe({
      next: (res) => {
        this._WishlistService.wishlistNumber.next(res.data.length);
        this._ToastrService.success('Product added successfully to your WishList!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
        this.getProducts();
        this.GetLoggedUserWishlist();
      }
    });
  }

  GetLoggedUserWishlist() {
    this.getWishlistSub = this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: (res) => {
        let newarr: [] = res.data ?? [];
        newarr.forEach((item: any) => {
          this.ProductIds.add(item._id);
        });
      }
    });
  }

  RemoveProductFromWishList(productId: any) {
    this.removeFromWishlistSub = this._WishlistService.RemoveProductFromWishlist(productId).subscribe({
      next: (res) => {
        this.getProducts();
        this.GetLoggedUserWishlist();
        this._WishlistService.wishlistNumber.next(res.data.length);
        this._ToastrService.success('Product removed successfully from your WishList!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
        this.ProductIds.delete(productId);
      }
    });
  }

  change(lang: string) {
    this._MyTranslateService.changeLang(lang);
  }

  ngOnInit(): void {
    this.getProducts();
    this.GetLoggedUserWishlist();
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
    this.addToCartSub?.unsubscribe();
    this.addToWishlistSub?.unsubscribe();
    this.getWishlistSub?.unsubscribe();
    this.removeFromWishlistSub?.unsubscribe();
  }
}
