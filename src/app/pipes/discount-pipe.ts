import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(price:number, discount: number = 0): number {
    if(discount < 0 || discount > 100){
      return price;
    }

    return price - (price * discount/100);
  }

}
