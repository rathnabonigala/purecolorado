import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = "http://localhost:8080/api/v1/products";

  constructor(private httpClient: HttpClient) { }
  
  getProductsList(): Observable<Product[]>{
    console.log(Product);
    return this.httpClient.get<Product[]>(`${this.apiURL}`);
  }
}
