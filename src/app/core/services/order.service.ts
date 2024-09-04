import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly _HttpClient = inject(HttpClient);

  CheckoutSession(cartId: string, shippingAddress: object): Observable<any> {
    return this._HttpClient.post(baseUrl + `/api/v1/orders/checkout-session/${cartId}` + "?url=http://localhost:4200/home/",
      {
        shippingAddress
      });
  }

  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(baseUrl + `/api/v1/orders/user/${userId}`);
  }

  CreateCashOrder(cartId: string, shippingAddress: object): Observable<any> {
    return this._HttpClient.post(baseUrl + `/api/v1/orders/${cartId}` + "?url=http://localhost:4200",
      {
        shippingAddress
      },
      {
        headers: {
          "token": localStorage.getItem('userToken')!,
        }
      });
  }

}
