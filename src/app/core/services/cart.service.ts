import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient);


  AddProductToCart(productId: any): Observable<any> {
    return this._HttpClient.post(baseUrl + "/api/v1/cart",
      {
        productId: productId
      })
  }

  UpdateCartProductQTY(productID: string, count: number): Observable<any> {
    return this._HttpClient.put(baseUrl + `/api/v1/cart/${productID}`,
      {
        count: count
      })
  }

  GetLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(baseUrl + `/api/v1/cart`)
  }

  RemoveSpecificCartItem(productID: string): Observable<any> {
    return this._HttpClient.delete(baseUrl + `/api/v1/cart/${productID}`)
  }

  ClearUserCart(): Observable<any> {
    return this._HttpClient.delete(baseUrl + `/api/v1/cart`)
  }

}
