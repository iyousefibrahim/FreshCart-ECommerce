import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }
  userData: any = null;
  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(baseUrl + '/api/v1/auth/signup', data);
  }

  loginForm(data: object): Observable<any> {
    return this._HttpClient.post(baseUrl + "/api/v1/auth/signin", data);
  }
  saveuserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      console.log(this.userData);
    }
  }
}
