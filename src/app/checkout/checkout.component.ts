import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      paymentMethod: ['creditCard', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Order Placed Successfully:', this.checkoutForm.value);
      alert('✅ Order placed successfully!');
      this.checkoutForm.reset();
      this.router.navigate(['/products']); // Navigate back to products or OrderConfirmation page
    } else {
      alert('❌ Please fill in all required fields.');
    }
  }
}
