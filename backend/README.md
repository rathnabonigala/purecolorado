# Pure Colorado — Backend (BMart)

Spring Boot 3 / Java 17 REST API for the Pure Colorado e-commerce app (local Colorado products).
Frontend: Angular app in the companion repo `purecolorado` (same GitHub account).

## Features
- Product catalog API (`/api/v1/products`)
- User sign-up and JWT authentication (BCrypt, role-based)
- Stripe test-mode payments (`POST /api/payment/create-payment-intent`)
- OpenAI-powered shopping assistant chatbot (`POST /api/chat`, gpt-4o-mini)

## Run it
Set environment variables (never commit real keys):

- `STRIPE_SECRET_KEY` — Stripe test secret key
- `OPENAI_API_KEY` — OpenAI API key
- `DB_PASSWORD`, `JWT_SECRET` — only for the default MySQL profile

Demo without MySQL (H2 in-memory):

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=h2
```

Default profile expects MySQL at `localhost:3306/bmart_product_management`.

See `FIXES.md` for the story of what was broken in the original version and how it was fixed.
