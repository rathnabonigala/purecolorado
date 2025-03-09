import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users'; // BMart API URL

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string; }, password: any): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
