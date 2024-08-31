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
      },
      {
        headers: {
          "token": localStorage.getItem('userToken')!,
        }
      })
  }

  UpdateCartProductQTY(productID: string, count: number): Observable<any> {
    return this._HttpClient.put(baseUrl + `/api/v1/cart/${productID}`, 
    {
      count: count
    }, {
      headers: {
        "token": localStorage.getItem('userToken')!,
      }
    })
  }

  GetLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(baseUrl + `/api/v1/cart`, {
      headers: {
        "token": localStorage.getItem('userToken')!,
      }
    })
  }

  RemoveSpecificCartItem(productID: string): Observable<any> {
    return this._HttpClient.delete(baseUrl + `/api/v1/cart/${productID}`, {
      headers: {
        "token": localStorage.getItem('userToken')!,
      }
    })
  }

  ClearUserCart(): Observable<any> {
    return this._HttpClient.delete(baseUrl + `/api/v1/cart`, {
      headers: {
        "token": localStorage.getItem('userToken')!,
      }
    })
  }

}
