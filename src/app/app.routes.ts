import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Define routes
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },  // Optional default route
  
];


