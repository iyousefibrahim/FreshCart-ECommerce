import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly _Router = inject(Router);
  private readonly _HttpClient = inject(HttpClient);
  

  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(baseUrl + '/api/v1/auth/signup', data);
  }

  loginForm(data: object): Observable<any> {
    return this._HttpClient.post(baseUrl + "/api/v1/auth/signin", data);
  }

  saveuserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      try {
        let userData = jwtDecode(localStorage.getItem('userToken')!);
        localStorage.setItem('userData',JSON.stringify(userData));
      }
      catch (error) {
        localStorage.clear();
      }
    }
  }

  signout(): void {
    localStorage.clear();
    this._Router.navigate(["/signin"])
  }

  forgotPassword(email: object): Observable<any> {
    return this._HttpClient.post(baseUrl + "/api/v1/auth/forgotPasswords", email);
  }

  verifyResetCode(resetCode: object): Observable<any> {
    return this._HttpClient.post(baseUrl + "/api/v1/auth/verifyResetCode", resetCode);
  }

  resetPassword(data: object): Observable<any> {
    return this._HttpClient.put(baseUrl + "/api/v1/auth/resetPassword", data);
  }


}
