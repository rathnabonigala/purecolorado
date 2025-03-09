import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product'; // Import the Product interface

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cart);

  getCart() {
    return this.cartSubject.asObservable();
  }

  addProduct(product: Product) {
    this.cart.push(product);
    this.cartSubject.next(this.cart);
  }

  getCartItemCount() {
    return this.cart.length;
  }
}
