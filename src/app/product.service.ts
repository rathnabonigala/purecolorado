import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = "/api/v1/products";
  products: any;

  constructor(private httpClient: HttpClient) { }
  
  getProductsList(): Observable<Product[]>{
    console.log(Product);
    return this.httpClient.get<Product[]>(`${this.apiURL}`,{headers});
  }
  public getProductById(productId: number): Observable<Product> {
    // Corrected usage of apiURL and httpClient
    return this.httpClient.get<Product>(`${this.apiURL}/${productId}`, { headers });
  }
  
}
