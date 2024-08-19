import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }

  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(baseUrl + '/api/v1/auth/signup', data);
  }

  loginForm(data: object): Observable<any> {
    return this._HttpClient.post(baseUrl + "/api/v1/auth/signin", data);
  }
}
