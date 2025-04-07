import { Component, OnInit} from '@angular/core';
import {Product} from '../product';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';

import { HeaderComponent } from '../header/header.component'; 
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderComponent,FooterComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []; // This will store the list of products
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductsList().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Method to handle product selection
  getProductById(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (data: Product) => {
        this.selectedProduct = data;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  // Assuming there's a method to add to cart
  addToCart(product: Product): void {
    console.log('Product added to cart:', product);
    // Add to cart logic here
  }
}


