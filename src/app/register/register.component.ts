import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  registerForm = this.fb.group({
    username: '',
    password: ''
  });

  register() {
    this.http.post('http://localhost:8080/auth/register', this.registerForm.value)
      .subscribe({
        next: () => {
          alert('Registration successful');
          this.router.navigate(['/product-list']);
        },
        error: () => alert('Username already taken')
      });
  }
}
