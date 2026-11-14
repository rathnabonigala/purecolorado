import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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
      const method = this.checkoutForm.value.paymentMethod;
      if (method === 'creditCard' || method === 'debitCard') {
        // Card payments go through the Stripe payment page.
        this.router.navigate(['/payment']);
      } else {
        console.log('Order Placed Successfully:', this.checkoutForm.value);
        alert('✅ Order placed successfully!');
        this.checkoutForm.reset();
        this.router.navigate(['/products']); // Navigate back to products or OrderConfirmation page
      }
    } else {
      alert('❌ Please fill in all required fields.');
    }
  }
}
