import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Categories } from '../../core/interfaces/categories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);

  allCategories: Categories[] = [];
  getAllCategories() {
    this._CategoriesService.getallCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {

    this.getAllCategories();
  }
}
