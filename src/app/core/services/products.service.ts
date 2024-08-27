import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient = inject(HttpClient);

  getProducts(): Observable<any> {
    return this._HttpClient.get(baseUrl + '/api/v1/products');
  }

  getProduct(id : string): Observable<any> {
    return this._HttpClient.get(baseUrl + `/api/v1/products/${id}`);
  }
}
