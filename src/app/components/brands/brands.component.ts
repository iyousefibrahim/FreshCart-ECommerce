import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/interfaces/product';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly _BrandsService = inject(BrandsService);

  allBrands: Brand[] = [];
  getAllBrands() {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => { this.allBrands = res.data },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.getAllBrands();
  }
}
