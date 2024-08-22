import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Route, Router } from '@angular/router';
import { AlertErrorComponent } from '../../shared/ui components/alert-error/alert-error.component';
import { loginValidator } from '../../shared/validators/login.validators';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, NgClass],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder);

  isLoading: boolean = false;
  erroMsg: string = "";
  loginmsgSuccess: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, loginValidator.email],
    password: [null, loginValidator.password],
  })

  loginSubmit() {
    if (this.loginForm.valid) {

      this.isLoading = true;
      this._AuthService.loginForm(this.loginForm.value).subscribe({

        next: (res) => {
          this.isLoading = false;
          this.loginmsgSuccess = true;

          // 1 - Save Token
          localStorage.setItem('userToken', res.token);
          // 2 - Decode Token 
          this._AuthService.saveuserData();
          // 3 - Navigate To Home

          setTimeout(() => {
            this._Router.navigate(['/home']);
          }, 2500);


        },
        error: (err) => {
            this.erroMsg = err.error.message,
            this.isLoading = false;
        }
      })
    }
  }


}
