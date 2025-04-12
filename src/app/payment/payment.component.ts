import { Component, inject } from '@angular/core';
import { StripeService } from './stripe.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  stripeService = inject(StripeService);

  async payNow() {
    const stripe = await loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');
    this.stripeService.createPaymentIntent(5000, 'usd').subscribe(async (res) => {
      if (res.clientSecret && stripe) {
        const result = await stripe.confirmCardPayment(res.clientSecret, {
          payment_method: {
            card: {
              // card element setup via Stripe Elements (optional)
            },
          },
        });

        if (result.error) {
          alert('Payment failed: ' + result.error.message);
        } else {
          alert('Payment successful!');
        }
      }
    });
  }
}




