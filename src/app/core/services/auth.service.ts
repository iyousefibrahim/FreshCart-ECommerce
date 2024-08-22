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
  userData: any = null;
  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(baseUrl + '/api/v1/auth/signup', data);
  }

  loginForm(data: object): Observable<any> {
    return this._HttpClient.post(baseUrl + "/api/v1/auth/signin", data);
  }
  saveuserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      try{
        this.userData = jwtDecode(localStorage.getItem('userToken')!);
      }
      catch(error){
        localStorage.clear();
      }
    }
  }

  signout() :void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(["/signin"])
  }
}
