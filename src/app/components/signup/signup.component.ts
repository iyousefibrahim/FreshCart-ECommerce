import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { AlertErrorComponent } from '../../shared/ui components/alert-error/alert-error.component';
import { confirmPassword } from '../../shared/utils/confirm-password.utils';
import { signupValidator } from '../../shared/validators/register.validators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, NgClass, TranslateModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy {

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  buttonStatus: boolean = true;
  errorMsg: string = "";
  registermsgSuccess: boolean = false;
  isLoading: boolean = false;

  private registerSubscription!: Subscription;

  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, signupValidator.name],
    email: [null, signupValidator.email],
    password: [null, signupValidator.password],
    rePassword: [null],
  }, { validators: [confirmPassword] });

  registerSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;

      this.registerSubscription = this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.registermsgSuccess = true;

          setTimeout(() => {
            this._Router.navigate(['/signin']);
          }, 2500);
        },
        error: (err) => {
          this.errorMsg = err.error.message;
          this.isLoading = false;
        }
      });
    }
  }

  change(lang: string) {
    this._MyTranslateService.changeLang(lang);
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }
}
