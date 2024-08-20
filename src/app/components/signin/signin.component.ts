import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Route, Router } from '@angular/router';
import { AlertErrorComponent } from '../../shared/ui components/alert-error/alert-error.component';
import { loginValidator } from '../../shared/validators/login.validators';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  isLoading: boolean = false;
  erroMsg: string = "";
  loginmsgSuccess: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, loginValidator.email),
    password: new FormControl(null, loginValidator.password),
  });

  loginSubmit() {
    if (this.loginForm.valid) {

      this.isLoading = true;
      this._AuthService.loginForm(this.loginForm.value).subscribe({

        next: (res) => {
          console.log(res), this.isLoading = false;
          this.loginmsgSuccess = true;

          // 1 - Save Token
          localStorage.setItem('userToken', res.token);
          // 2 - Decode Token 
          this._AuthService.saveuserData();
          // 3 - Navigate To Home

          this._Router.navigate(['/home']);


        },
        error: (err) => {
          console.log(err),
            this.erroMsg = err.error.message,
            this.isLoading = false;
        }
      })
    }
  }


}
