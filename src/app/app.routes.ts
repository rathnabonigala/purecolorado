import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderComponent } from './header/header.component';
// Define routes
export const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  {path:'header', component:HeaderComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },  // Optional default route
  
];


