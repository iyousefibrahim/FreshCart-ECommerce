import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private readonly _HttpClient = inject(HttpClient);

  getAllBrands(): Observable<any> {
    return this._HttpClient.get(baseUrl + '/api/v1/brands');
  }

  GetSpecificBrand(brandId: string): Observable<any> {
    return this._HttpClient.get(baseUrl + `/api/v1/brands/${brandId}`);
  }
}
