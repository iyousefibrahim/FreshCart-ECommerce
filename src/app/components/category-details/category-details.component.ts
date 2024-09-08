import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../../core/interfaces/categories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent {
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  categoryId!: string;
  categoryData: Categories = {} as Categories;
  GetSpecificCategorySub!: Subscription;
  _ActivatedRouteSub!: Subscription;


  GetSpecificCategory(categoryId: string) {
    this._CategoriesService.GetSpecificCategory(categoryId).subscribe({
      next: (res) => {
        this.categoryData = res.data;
      }
    })
  }

  ngOnInit(): void {
    this._ActivatedRouteSub = this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        this.categoryId = res.get('id')!;
      }
    })
    this.GetSpecificCategory(this.categoryId);
  }

  ngOnDestroy(): void {
    this.GetSpecificCategorySub?.unsubscribe();
    this._ActivatedRouteSub?.unsubscribe();
  }
}
