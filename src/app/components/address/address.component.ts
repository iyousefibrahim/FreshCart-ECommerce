import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { signupValidator } from '../../shared/validators/register.validators';
import { AlertErrorComponent } from "../../shared/ui components/alert-error/alert-error.component";

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _OrderService = inject(OrderService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  cartId!: string;
  isLoading: boolean = false;

  addressForm: FormGroup = this._FormBuilder.group({
    details: [null],
    phone: [null, signupValidator.phone],
    city: [null, Validators.required],
  })


  payinCash() {
    this._OrderService.CreateCashOrder(this.cartId, this.addressForm.value).subscribe({
      next: (res) => {
        console.log(res),
        this.isLoading = false
      },

    })
  }

  paybyCard() {
    this._OrderService.CheckoutSession(this.cartId, this.addressForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        window.location.href = res.session.url;
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }

  addressSubmit() {
    if (this.addressForm.valid) {
      this.isLoading = true;
    }
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id')!;
      },
    })

  }
}
