import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Cart } from '../../core/interfaces/cart';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  isLoading: boolean = true;
  userCart: Cart = {} as Cart;
  totalPrice!: any;
  totalItems!: any;

  GetUserCart() {
    this._CartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.userCart = res,
        this.totalPrice = res.data.totalCartPrice,
        this.totalItems = res.numOfCartItems
      },
    })
  }

  ClearUserCart() {
    this._CartService.ClearUserCart().subscribe({
      next: (res) => {
        console.log(res)
        this._ToastrService.success('The Cart has been cleard!', '', {
          progressBar: true
        })
        this.GetUserCart();
      }
    })
  }

  RemoveSpecificCartItem(productID: string) {
    this._CartService.RemoveSpecificCartItem(productID).subscribe({
      next: (res) => {
        console.log(res);
        this.GetUserCart();
        this._ToastrService.success('Item Removed From Cart!', '', {
          progressBar: true
        })

      }
    })
  }

  UpdateCartProductQTY(productID: string, count: number) {
    this._CartService.UpdateCartProductQTY(productID, count).subscribe({
      next: (res) => {
        this.GetUserCart();
      }
    })
  }
  ngOnInit(): void {
    this.GetUserCart();
  }
}
