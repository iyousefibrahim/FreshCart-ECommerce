import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AlertErrorComponent } from '../../shared/ui components/alert-error/alert-error.component';
import { loginValidator } from '../../shared/validators/login.validators';
import { NgClass } from '@angular/common';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, NgClass, RouterLink, TranslateModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnDestroy {

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  isLoading: boolean = false;
  erroMsg: string = "";
  loginmsgSuccess: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, loginValidator.email],
    password: [null, loginValidator.password],
  });

  private loginSubscription!: Subscription;

  loginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.loginSubscription = this._AuthService.loginForm(this.loginForm.value).subscribe({
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
          this.erroMsg = err.error.message;
          this.isLoading = false;
        }
      });
    }
  }

  change(lang: string) {
    this._MyTranslateService.changeLang(lang);
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
