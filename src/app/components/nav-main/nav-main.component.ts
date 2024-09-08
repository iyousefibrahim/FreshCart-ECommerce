import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, TranslateModule],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.scss'
})
export class NavMainComponent {
  private readonly _MyTranslateService = inject(MyTranslateService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  readonly _AuthService = inject(AuthService);
  readonly _TranslateService = inject(TranslateService);
  cartCount: number = 0;
  wishlistCount: number = 0;

  change(lang: string) {
    this._MyTranslateService.changeLang(lang);
  }


  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (res) => this.cartCount = res,
    })

    this._WishlistService.wishlistNumber.subscribe({
      next: (res) => this.wishlistCount = res,
    })

    this._CartService.GetLoggedUserCart().subscribe({
      next: (res) => this._CartService.cartNumber.next(res.numOfCartItems)
    })

    this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: (res) => this._WishlistService.wishlistNumber.next(res.count)
    })
  }
}
