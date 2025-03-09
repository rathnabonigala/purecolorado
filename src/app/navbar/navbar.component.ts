import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItemCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cart updates to show the number of items in the cart
    this.cartService.getCart().subscribe(cart => {
      this.cartItemCount = cart.length;
    });
  }
}
