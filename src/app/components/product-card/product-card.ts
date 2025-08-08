import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { StockStatusPipe } from "../../pipes/stock-status-pipe";
import { CommonModule } from '@angular/common';
import { DiscountPipe } from '../../pipes/discount-pipe';

@Component({
  selector: 'app-product-card',
  imports: [StockStatusPipe, CommonModule,DiscountPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {

  @Input() product: IProduct = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    category: '',
    inStock: false,
    createAt: new Date(),
  }

  @Input() showDiscount: boolean = false;
  @Input() discountPercent: number = 0;

  @Output() deleteProduct = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<IProduct>();

  onDelete(){
    if(confirm(`¿Estás seguro de eliminar el producto ${this.product.name}?`)){
      this.deleteProduct.emit(this.product.id);
    }
  }

  onViewDetails(){
    this.viewDetails.emit(this.product);
  }

}
