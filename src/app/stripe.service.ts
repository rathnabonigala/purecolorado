import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StripeService {
  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number, currency: string) {
    return this.http.post<any>('http://localhost:8080/api/payment/create-payment-intent', {
      amount,
      currency,
    });
  }
}

