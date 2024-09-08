import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { WishList } from '../../core/interfaces/wishlist';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, TranslateModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  wishlistCount: number = 0;
  allWishList: WishList = {} as WishList;

  private getWishlistSubscription!: Subscription;
  private removeProductSubscription!: Subscription;
  private addProductToCartSubscription!: Subscription;

  ngOnInit(): void {
    this.GetLoggedUserWishlist();
  }

  GetLoggedUserWishlist() {
    this.getWishlistSubscription = this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: (res) => {
        this.allWishList = res;
        this._WishlistService.wishlistNumber.next(res.count);
      }
    });
  }

  RemoveProductFromWishlist(productId: string) {
    this.removeProductSubscription = this._WishlistService.RemoveProductFromWishlist(productId).subscribe({
      next: (res) => {
        this.GetLoggedUserWishlist();
        this._WishlistService.wishlistNumber.next(res.data.length);
        this._ToastrService.success('Product removed successfully from your WishList!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  AddProductToCart(productId: string) {
    this.addProductToCartSubscription = this._CartService.AddProductToCart(productId).subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
        this._ToastrService.success('Product added successfully to your cart!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  change(lang: string) {
    this._MyTranslateService.changeLang(lang);
  }

  ngOnDestroy(): void {
    this.getWishlistSubscription?.unsubscribe();
    this.removeProductSubscription?.unsubscribe();
    this.addProductToCartSubscription?.unsubscribe();
  }
}
