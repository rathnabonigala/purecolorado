import { Component, OnInit} from '@angular/core';
import {Product} from '../product';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { CartService } from '../cart.service'; 
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService,private cartService: CartService,private router: Router){}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(){
    
    this.productService.getProductsList().subscribe(data => {
      console.log('Received products:', data);
      this.products = data;
      
    });
  
  }
  addToCart(product: Product) {
    this.cartService.addProduct(product);  // Add the product to the cart
    alert(`${product.name} has been added to the cart!`);
     
  }
  
} 



