import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, TranslateModule],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.scss'
})
export class NavMainComponent implements OnInit, OnDestroy {
  private readonly _MyTranslateService = inject(MyTranslateService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  readonly _AuthService = inject(AuthService);
  readonly _TranslateService = inject(TranslateService);

  cartCount: number = 0;
  wishlistCount: number = 0;

  private cartNumberSub!: Subscription;
  private wishlistNumberSub!: Subscription;
  private cartItemsSub!: Subscription;
  private wishlistItemsSub!: Subscription;

  change(lang: string) {
    this._MyTranslateService.changeLang(lang);
  }

  ngOnInit(): void {
    this.cartNumberSub = this._CartService.cartNumber.subscribe({
      next: (res) => this.cartCount = res,
    });

    this.wishlistNumberSub = this._WishlistService.wishlistNumber.subscribe({
      next: (res) => this.wishlistCount = res,
    });

    this.cartItemsSub = this._CartService.GetLoggedUserCart().subscribe({
      next: (res) => this._CartService.cartNumber.next(res.numOfCartItems),
    });

    this.wishlistItemsSub = this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: (res) => this._WishlistService.wishlistNumber.next(res.count),
    });
  }

  ngOnDestroy(): void {
    this.cartNumberSub?.unsubscribe();
    this.wishlistNumberSub?.unsubscribe();
    this.cartItemsSub?.unsubscribe();
    this.wishlistItemsSub?.unsubscribe();
  }
}
