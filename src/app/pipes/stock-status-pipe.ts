import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus'
})
export class StockStatusPipe implements PipeTransform {

  transform(inStock: boolean): string {
    return inStock ? 'En Stock' : 'Agotado';
  }

}
