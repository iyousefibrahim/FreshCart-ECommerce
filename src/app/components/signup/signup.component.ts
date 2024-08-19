import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputMsgComponent } from "../../shared/ui components/form-input-msg/form-input-msg.component";
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputMsgComponent, NgClass],
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
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0-1-2-5][0-9]{8}$/)])
  }, this.confirmPassword);

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

  confirmPassword(registerForm: AbstractControl) {
    if (registerForm.get('password')?.value === registerForm.get('rePassword')?.value) {
      return null
    }
    else {
      return { mismatch: true }
    }
  }

}
