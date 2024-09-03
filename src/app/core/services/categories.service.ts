import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly _HttpClient = inject(HttpClient);

  getallCategories(): Observable<any> {
    return this._HttpClient.get(baseUrl + "/api/v1/categories");
  }

  GetSpecificCategory(categoryId: string): Observable<any> {
    return this._HttpClient.get(baseUrl + `/api/v1/categories/${categoryId}`);
  }

}
