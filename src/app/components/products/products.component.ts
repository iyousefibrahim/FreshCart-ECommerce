import { Component, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, ProductStockPipe, NgClass, SearchPipe, FormsModule,TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  allProducts: products[] = [];
  ProductIds = new Set<string>();
  text: string = "";

  getProducts() {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data
      }
    })
  }

  AddProductToCart(product_id: any) {
    this._CartService.AddProductToCart(product_id).subscribe({
      next: (res) => {
        this._ToastrService.success('Product added successfully to your cart!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
      },
    })
  }

  AddProductToWishList(productId: any) {
    this._WishlistService.AddProductToWishlist(productId).subscribe({
      next: (res) => {
        this._ToastrService.success('Product added successfully to your WishList!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
        this.getProducts();
        this.GetLoggedUserWishlist();
      }
    })
  }

  GetLoggedUserWishlist() {
    this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: (res) => {

        let newarr: [] = res.data;

        newarr.forEach((item: any) => {
          this.ProductIds.add(item._id);
        });
      }
    });
  }

  RemoveProductFromWishList(productId: any) {
    this._WishlistService.RemoveProductFromWishlist(productId).subscribe({
      next: (res) => {
        this._ToastrService.success('Product removed successfully from your WishList!', '', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
        this.ProductIds.delete(productId);
        this.getProducts();
        this.GetLoggedUserWishlist();
      }
    })
  }

  change(lang: string) {
    this._MyTranslateService.changeLang(lang);
  }

  ngOnInit(): void {
    this.getProducts();
    this.GetLoggedUserWishlist();
  }
}
