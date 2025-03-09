// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Spring Boot backend URL

  constructor(private http: HttpClient) {}

  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem('token'); // Remove the JWT token
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if the JWT token exists
  }
}
