import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { NavbarComponent } from './navbar/navbar.component';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderComponent } from './header/header.component';

// Define routes
export const routes: Routes = [
  
  
  {path:'header', component:HeaderComponent},
  
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'product-list', component: ProductListComponent },
  
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },  // Optional default route
  
];


