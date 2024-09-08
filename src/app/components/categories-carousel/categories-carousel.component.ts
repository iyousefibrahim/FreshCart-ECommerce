import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';
import { Categories } from '../../core/interfaces/categories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-carousel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categories-carousel.component.html',
  styleUrl: './categories-carousel.component.scss'
})
export class CategoriesCarouselComponent implements OnInit {

  private readonly _CategoriesService = inject(CategoriesService);
  allCategories: Categories[] = [];
  getallCategoriesSub!: Subscription;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    rtl: true,
    touchDrag: true,
    autoplay: true,
    pullDrag: false,
    dots: false,
    nav: false,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },

  }

  ngOnInit(): void {
    this.getallCategoriesSub = this._CategoriesService.getallCategories().subscribe({
      next: (res) => { this.allCategories = res.data }
    })
  }
  ngOnDestroy(): void {
    this.getallCategoriesSub?.unsubscribe();
  }

}
