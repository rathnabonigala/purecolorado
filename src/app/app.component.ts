import { Component } from '@angular/core';

import { UserListComponent } from './user-list/user-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NavbarComponent } from './navbar/navbar.component';



@Component({
  selector: 'app-root',
  imports: [UserListComponent,ProductListComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'purecolorado';
}
