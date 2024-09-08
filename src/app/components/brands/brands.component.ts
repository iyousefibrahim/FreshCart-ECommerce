import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly _BrandsService = inject(BrandsService);
  GetAllBrandSub!:Subscription;

  allBrands: Brand[] = [];
  getAllBrands() {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => { this.allBrands = res.data },
    });
  }

  ngOnInit(): void {
    this.getAllBrands();
  }
  ngOnDestroy(): void {
    this.GetAllBrandSub?.unsubscribe();
  }
}
