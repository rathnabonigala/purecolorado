import { Component, OnInit} from '@angular/core';
import {Product} from '../product';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService,){}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(){
    
    this.productService.getProductsList().subscribe(data => {
      console.log('Received products:', data);
      this.products = data;
      
    });
  
  }
}



