import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly _HttpClient = inject(HttpClient);

  GetLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(baseUrl + '/api/v1/wishlist');
  }

  AddProductToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(baseUrl + '/api/v1/wishlist',
      {
        productId: productId
      }, {
      headers: {
        "token": localStorage.getItem('userToken')!,
      }
    });
  }

  RemoveProductFromWishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(baseUrl + `/api/v1/wishlist/${productId}`,
      {
        headers: {
          "token": localStorage.getItem('userToken')!,
        }
      });
  }


}
