import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../core/interfaces/product';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent {
  private readonly _BrandsService = inject(BrandsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  brandId!: string;
  brandData: Brand = {} as Brand;

  GetSpecificBrand(brandId: string) {
    this._BrandsService.GetSpecificBrand(brandId).subscribe({
      next: (res) => {
        this.brandData = res.data;
      }
    })
  }
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandId = params.get('id')!;
      }
    })
    
    this.GetSpecificBrand(this.brandId);
  }

}
