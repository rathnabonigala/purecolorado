export const environment = {
    production: false,
    apiBaseUrl: 'http://localhost:8080/api/v1', // Replace with your actual base URL
    // Stripe *publishable* key (safe to keep in frontend code). Paste your own
    // test-mode publishable key from the Stripe dashboard here — it starts
    // with pk_test_. Never put the secret key (sk_test_/sk_live_) in frontend code.
    stripePublishableKey: 'pk_test_REPLACE_WITH_YOUR_TEST_KEY',
  };
