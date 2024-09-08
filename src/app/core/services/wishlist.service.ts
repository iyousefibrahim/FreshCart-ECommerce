import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly _HttpClient = inject(HttpClient);

  wishlistNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  GetLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(baseUrl + '/api/v1/wishlist');
  }

  AddProductToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(baseUrl + '/api/v1/wishlist',
      {
        productId: productId
      }
    );
  }

  RemoveProductFromWishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(baseUrl + `/api/v1/wishlist/${productId}`);
  }


}
