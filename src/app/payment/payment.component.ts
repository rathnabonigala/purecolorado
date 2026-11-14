import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import type { Stripe, StripeCardElement } from '@stripe/stripe-js';
import { StripeService } from '../stripe.service';
import { CartService } from '../cart.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  private stripeService = inject(StripeService);
  private cartService = inject(CartService);
  private platformId = inject(PLATFORM_ID);

  private stripe: Stripe | null = null;
  private cardElement: StripeCardElement | null = null;

  /** Amount to charge, in cents. Defaults to $50.00 when the cart is empty. */
  amountCents = 5000;
  cardReady = false;
  processing = false;
  errorMessage = '';
  successMessage = '';

  async ngOnInit(): Promise<void> {
    // Charge the real cart total (converted to cents); fall back to $50.00
    // when the cart is empty so the demo page still works standalone.
    this.cartService.getCart().subscribe(items => {
      const totalDollars = items.reduce((sum, p) => sum + (p.price || 0), 0);
      this.amountCents = totalDollars > 0 ? Math.round(totalDollars * 100) : 5000;
    });

    // Stripe.js must only load in the browser (this app uses SSR).
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      const { loadStripe } = await import('@stripe/stripe-js');
      this.stripe = await loadStripe(environment.stripePublishableKey);
      if (!this.stripe) {
        this.errorMessage = 'Stripe could not be loaded. Check the publishable key in environment.ts.';
        return;
      }
      const elements = this.stripe.elements();
      this.cardElement = elements.create('card');
      this.cardElement.mount('#card-element');
      this.cardElement.on('change', event => {
        this.errorMessage = event.error ? (event.error.message ?? 'Card details are incomplete.') : '';
      });
      this.cardReady = true;
    } catch {
      this.errorMessage = 'Stripe could not be loaded. Please check your connection and try again.';
    }
  }

  ngOnDestroy(): void {
    this.cardElement?.destroy();
  }

  async payNow(): Promise<void> {
    if (!this.stripe || !this.cardElement) {
      this.errorMessage = 'Payment form is not ready yet. Please wait a moment and try again.';
      return;
    }
    this.processing = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.stripeService.createPaymentIntent(this.amountCents, 'usd').subscribe({
      next: async res => {
        if (!res.clientSecret) {
          this.errorMessage = 'The server did not return a payment secret. Please try again.';
          this.processing = false;
          return;
        }
        const result = await this.stripe!.confirmCardPayment(res.clientSecret, {
          payment_method: { card: this.cardElement! },
        });
        if (result.error) {
          this.errorMessage = 'Payment failed: ' + (result.error.message ?? 'unknown error');
        } else if (result.paymentIntent?.status === 'succeeded') {
          this.successMessage = 'Payment successful! Thank you for supporting Colorado makers.';
        } else {
          this.errorMessage = 'Payment was not completed (status: ' + result.paymentIntent?.status + ').';
        }
        this.processing = false;
      },
      error: () => {
        this.errorMessage = 'Could not reach the payment server. Is the backend running on port 8080?';
        this.processing = false;
      },
    });
  }
}
