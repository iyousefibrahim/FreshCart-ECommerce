import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputMsgComponent } from "../../shared/ui components/form-input-msg/form-input-msg.component";
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputMsgComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  isLoading :boolean= false;
  erroMsg : string = "";
  loginmsgSuccess :boolean =false;
  loginForm : FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.required, Validators.email]),
    password : new FormControl(null,[Validators.required, Validators.pattern(/^\w{6,}$/)]),
  });

  loginSubmit(){
    if(this.loginForm.valid){
      this.isLoading = true;
      this._AuthService.loginForm(this.loginForm.value).subscribe({
        next: (res) => {console.log(res), this.isLoading = false;
        this.loginmsgSuccess = true;
          setTimeout(() => {
            this._Router.navigate(['/home']);
          }, 2500);

        },
        error: (err) => {console.log(err), this.erroMsg = err.error.message,this.isLoading = false;}
      })
    }
  }


}
