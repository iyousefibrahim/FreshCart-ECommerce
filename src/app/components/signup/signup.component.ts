import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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


  constructor(private _AuthService: AuthService, private _Router: Router) { }

  buttonStatus: boolean = true;
  errorMsg: string = "";
  registermsgSuccess: boolean = false;
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null,signupValidator.name),
    email: new FormControl(null,signupValidator.email),
    password: new FormControl(null, signupValidator.password),
    rePassword: new FormControl(null),
    phone: new FormControl(null, signupValidator.phone)
  }, confirmPassword);

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
