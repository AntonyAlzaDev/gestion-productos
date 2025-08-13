import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto-service';
import { IProduct } from '../../interfaces/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  
  private productService = inject(ProductoService);

  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  selectedCategory: string = 'all';
  categories: string[] = [];
  searchTerm: string = '';
  showDiscount: boolean = false;
  discountPercent: number = 0;

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(){
    this.products = this.productService.getProducts();
    this.applyFilters();
  }

  loadCategories(){
    this.categories = this.productService.getCategories();
  }

  onCategoryChange(){
    this.applyFilters();
  }

  onSearchChange(){
    this.applyFilters();
  }

  applyFilters(){
    let filtered = this.products;

    if(this.selectedCategory !== 'all'){
      filtered = filtered.filter(prod => prod.category === this.selectedCategory)
    }

    if(this.searchTerm.trim()){
      const search = this.searchTerm.toLowerCase().trim();

      filtered = filtered.filter( product => 
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
       );
    }

    this.filteredProducts = filtered;
  }

  onDeleteProduct(productID: number){
    this.productService.deleteProduct(productID);
    this.loadProducts();
  }

  onViewDetails(product: IProduct){
    alert(`Detalle de: ${product.name} \n\nDescripción: ${product.description}\nCategoría: ${product.category}\nPrecio: S/. ${product.price.toFixed(2)}\nEn Stock: ${product.inStock ? 'Sí' : 'No'}\nCreado el: ${product.createAt.toLocaleDateString('es-PE')}`);
  }

  get totalProducts(): number{
    return this.products.length;
  }

  get totalFilteredProducts(): number{
    return this.filteredProducts.length;
  }

  get productsInStock(): number{
    return this.productService.getInStockCount();
  }


  trackByProductId(index: number, product: IProduct): number {
    return product.id;
  }
  


}
