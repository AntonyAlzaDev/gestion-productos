import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private products: IProduct[] = [
    {
      id: 1,
      name: 'Laptop',
      price: 1200,
      description: 'High performance laptop',
      category: 'Electronics',
      inStock: true,
      createAt: new Date('2023-01-01')
    },
    {
      id: 2,
      name: 'Smartphone',
      price: 800,
      description: 'Latest model smartphone',
      category: 'Electronics',
      inStock: true,
      createAt: new Date('2023-02-01')
    },
    {
      id: 3,
      name: 'Headphones',
      price: 150,
      description: 'Noise-cancelling headphones',
      category: 'Accessories',
      inStock: false,
      createAt: new Date('2023-03-01')
    },
    {
      id: 4,
      name: 'Smartwatch',
      price: 250,
      description: 'Feature-rich smartwatch',
      category: 'Wearables',
      inStock: true,
      createAt: new Date('2023-04-01')
    },
    {
      id: 5,
      name: 'Tablet',
      price: 600,
      description: 'Portable tablet with stylus support',
      category: 'Electronics',
      inStock: true,
      createAt: new Date('2023-05-01')
    }
  ];
  
  getProducts(): IProduct[]{
    return this.products;
  }

  getProductsByCategory(category: string): IProduct[]{
    if(category === 'all'){
      return this.getProducts();
    } 
    return this.products.filter(product => product.category === category);
  }

  addProduct(product: Omit<IProduct, 'id'>): void {
    const newProduct: IProduct= {
      ...product,
      id: this.generateId(),
      createAt: new Date()
    };

    this.products.push(newProduct);
  }

  deleteProduct(id: number): void{
    this.products = this.products.filter(product => product.id !== id);
  }

  getProductById(id: number): IProduct | undefined{
    return this.products.find(product => product.id === id);
  }

  getCategories(): string[]{
    const categories = this.products.map(product => product.category);

    return ['all', ...new Set(categories)];
  }

  private generateId(): number {

    return this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
  }

  getInStockCount(): number{
    return this.products.filter(product => product.inStock).length;
  }

  getTotalInventoryValue(): number{
    return this.products.
      filter(product => product.inStock).
      reduce((total, product) => total + product.price, 0);
  }


}
