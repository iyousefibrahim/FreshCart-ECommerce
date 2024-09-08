import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from "../../shared/ui components/alert-error/alert-error.component";
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { signupValidator } from '../../shared/validators/register.validators';
import { Subscription } from 'rxjs';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, AlertErrorComponent,TranslateModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  isLoading: boolean = false;
  errorMsg: string = "";
  verfifymsgSuccess: boolean = false;
  forgotmsgSuccess: boolean = false;
  resetmsgSuccess: boolean = false;
  forgotPasswordSub!:Subscription;
  verifyResetCodeSub!:Subscription;
  resetPasswordSub!:Subscription;

  steps: number = 1;

  //Step 1
  forgotpasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.email, Validators.required]],
  })

  forgotSubmit() {
    if (this.forgotpasswordForm.valid) {

      this.isLoading = true;
      this.forgotPasswordSub = this._AuthService.forgotPassword(this.forgotpasswordForm.value).subscribe({

        next: (res) => {
          this.isLoading = false;
          this.forgotmsgSuccess = true;
          let emailvalue = this.forgotpasswordForm.get('email')?.value;
          this.resetPasswordForm.get('email')?.patchValue(emailvalue);
          this.steps = 2;
        },
        error: (err) => {
          this.errorMsg = err.error.message,
          this.isLoading = false;
        }
      })
    }
  }

  //Step 2
  verifycodeForm: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  });

  verifySubmit() {
    if (this.verifycodeForm.valid) {

      this.isLoading = true;
      this.verifyResetCodeSub = this._AuthService.verifyResetCode(this.verifycodeForm.value).subscribe({

        next: (res) => {
          this.isLoading = false;
          this.verfifymsgSuccess = true;
          this.steps = 3;
        },
        error: (err) => {
          this.errorMsg = err.error.message,
          this.isLoading = false;
        }
      })
    }
  }

  //Step 3
  resetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null],
    newPassword: [null, signupValidator.password],
  });

  resetSubmit() {
    if (this.resetPasswordForm.valid) {

      this.isLoading = true;
      this.resetPasswordSub = this._AuthService.resetPassword(this.resetPasswordForm.value).subscribe({

        next: (res) => {
          this.isLoading = false;
          this.resetmsgSuccess = true;
          localStorage.setItem('userToken', res.token);
          setTimeout(() => {
            this._Router.navigate(["/home"]);
          }, 3000);
        },
        error: (err) => {
          this.errorMsg = err.error.message,
            this.isLoading = false;
        }
      })
    }
  }

   change(lang: string) {
    this._MyTranslateService.changeLang(lang);
  }

  ngOnDestroy(): void {
   
   this.forgotPasswordSub?.unsubscribe();
   this.verifyResetCodeSub?.unsubscribe();
   this.resetPasswordSub?.unsubscribe();
    
  }


}
