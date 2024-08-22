import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { AlertErrorComponent } from '../../shared/ui components/alert-error/alert-error.component';
import { confirmPassword } from '../../shared/utils/confirm-password.utils';
import { signupValidator } from '../../shared/validators/register.validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder)


  buttonStatus: boolean = true;
  errorMsg: string = "";
  registermsgSuccess: boolean = false;
  isLoading: boolean = false;

  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, signupValidator.name],
    email: [null, signupValidator.email],
    password: [null, signupValidator.password],
    rePassword: [null],
    phone: [null, signupValidator.phone]
  },{validators:[confirmPassword]})

  regsiterSubmit() {

    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.registermsgSuccess = true;
          setTimeout(() => {
            this._Router.navigate(['/signin']);
          }, 2500);

        },
        error: (err) => { this.errorMsg = err.error.message; this.isLoading = false; }
      });
    }
    

  }



}
