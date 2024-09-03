import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { WishList } from '../../core/interfaces/wishlist';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  allWishList: WishList = {} as WishList;

  GetLoggedUserWishlist() {
    this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: (res) => {
        this.allWishList = res;
      }
    })
  }

  RemoveProductFromWishlist(productId: string) {
    this._WishlistService.RemoveProductFromWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.GetLoggedUserWishlist();
        this._ToastrService.success('Product remove successfully from your WishList!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    })
  }

  AddProductToCart(productId: string) {
    this._CartService.AddProductToCart(productId).subscribe({
      next: (res) => {
        this._ToastrService.success('Product added successfully to your cart!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });

      }
    })
  }
  ngOnInit(): void {
    this.GetLoggedUserWishlist();
  }
}
