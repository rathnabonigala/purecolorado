import { Component,OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((data) => {
      this.cart = data;
      this.calculateTotals();
    });
  }
  calculateTotals(): void {
    this.totalPrice = this.cart.reduce((sum, item) => sum + item.price, 0);
    this.totalQuantity = this.cart.length; // Or sum of quantity field if you have one
  }

  placeOrder(): void {
    if (this.cart.length > 0) {
      this.router.navigate(['/checkout'], { state: { cart: this.cart, total: this.totalPrice } });
    } else {
      alert('Cart is empty!');
    }
  }  
}