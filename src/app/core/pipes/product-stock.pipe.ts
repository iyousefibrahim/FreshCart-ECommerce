import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productStock',
  standalone: true
})
export class ProductStockPipe implements PipeTransform {

  transform(data: number): unknown {
    if (data <= 0) {
      return 'Out of Stock';
    }
    else {
      return `${data} Left In Stock`;
    }
  }

}
