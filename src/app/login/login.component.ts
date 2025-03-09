// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // For redirecting after login
import { catchError } from 'rxjs';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule for reactive forms
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Validate if username is not empty
      password: ['', [Validators.required]],
      role: ['', [Validators.required]] // Validate if password is not empty
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Make POST request to backend for login
      this.http
        .post<any>('http://localhost:8080/api/v1/users/login', { username, password })
        .pipe(
          catchError((error) => {
            this.errorMessage = 'Invalid username or password';
            return of(error);
          })
        )
        .subscribe((response) => {
          // Handle successful login (save token, redirect, etc.)
          if (response) {
            localStorage.setItem('username', response); // Example of saving username in localStorage
            this.router.navigate(['/product-list']); // Navigate to the dashboard after login
          }
        });
    }
  }
}
