# Pure Colorado — What Was Broken and What I Fixed

A plain-language tour of every bug that kept Stripe checkout and the AI chatbot
from working, and the change that fixed each one. Each item is written the way
you could explain it in a job interview: **symptom → root cause → fix**.

Locations: fixed backend in `backend/`, fixed frontend in `frontend/`.
The original files were not touched.

---

## The chatbot

### 1. The AI model it called no longer exists
- **Symptom:** every chat message failed.
- **Root cause:** `ChatbotService` called OpenAI's old *Completions* API with
  the model `text-davinci-003`. OpenAI retired that model in January 2024, so
  the API rejected every request.
- **Fix:** switched to the modern *Chat Completions* API
  (`createChatCompletion`) with the model `gpt-4o-mini`, sending a system
  prompt ("you are the assistant for a Colorado local-products shop") plus the
  shopper's message — the same request shape ChatGPT itself uses.

### 2. The OpenAI API key was hard-coded in the source code
- **Symptom:** a live secret key sat in plain text inside `ChatbotService.java`.
  Anyone who sees the code owns the key — and because the code was headed for
  GitHub, the key has to be considered exposed.
- **Fix:** the key now comes from configuration. A small `OpenAiConfig` class
  builds the `OpenAiService` from the property `openai.api.key`, and
  `application.properties` fills that property from the `OPENAI_API_KEY`
  environment variable: `openai.api.key=${OPENAI_API_KEY:}`. The service
  receives the client by constructor injection. **Action still needed: revoke
  the old key in the OpenAI dashboard and generate a new one** — removing it
  from the code does not un-expose a key that was already in source.

### 3. No error handling — one failure crashed the whole request
- **Symptom:** any OpenAI problem (bad key, outage, retired model) became an
  unhandled HTTP 500 for the shopper.
- **Fix:** `askQuestion` wraps the API call in try/catch, logs the real reason
  server-side, and returns a friendly fallback sentence ("our shopping
  assistant is unavailable right now…"). Verified live: with no API key set,
  `POST /api/chat` returns HTTP 200 with that fallback instead of a 500.

### 4. The browser was blocked by CORS
- **Symptom:** the chat UI in the browser never got a reply even when the
  backend was up.
- **Root cause:** the Angular `ChatService` calls `http://localhost:8080/api/chat`
  directly, which is a different origin from the dev server on port 4200. The
  backend had no CORS configuration, so the browser blocked the responses.
- **Fix:** two layers — a global CORS configuration in the security config
  (origin `http://localhost:4200`, methods GET/POST/PUT/DELETE/OPTIONS, all
  headers, `.cors()` enabled in the filter chain), plus
  `@CrossOrigin(origins = "http://localhost:4200")` on `ChatbotController`.
  Verified with a real preflight request: the backend now answers with
  `Access-Control-Allow-Origin: http://localhost:4200`.

### 5. The chat UI component didn't compile
- **Symptom:** the Angular build itself failed.
- **Root cause:** `ChatbotComponent` injected a `ChatService` it never
  imported, and its `imports: []` lacked `FormsModule` (needed for
  `[(ngModel)]`) and `CommonModule` (needed for `*ngFor`/`[ngClass]`) that its
  template uses. `chat.service.ts` was also missing its own import statements
  entirely (`Injectable`, `HttpClient`, `Observable`).
- **Fix:** added the missing imports, marked the component standalone with
  `imports: [CommonModule, FormsModule]`, and added an error handler so a
  failed request shows a friendly bot message instead of silence.

---

## Stripe checkout

### 6. The frontend used a placeholder Stripe key
- **Symptom:** the payment page could never talk to Stripe.
- **Root cause:** `loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX')` — a literal
  placeholder, not a real publishable key.
- **Fix:** the publishable key is now read from
  `src/environments/environment.ts` (`stripePublishableKey`). It currently
  holds the placeholder `pk_test_REPLACE_WITH_YOUR_TEST_KEY` on purpose:
  **paste your own test publishable key from the Stripe dashboard** (the
  publishable key is designed to live in frontend code; the secret key never
  belongs there).

### 7. The payment page was a stub — no card form ever existed
- **Symptom:** a "payment works!" paragraph and a Pay button that called
  Stripe with an *empty object* instead of a card.
- **Root cause:** Stripe Elements was never used. `confirmCardPayment` was
  given `card: { }`, which can never succeed, and the amount was hard-coded
  to $50.
- **Fix:** the page now creates a real Stripe Elements card input and mounts
  it into the template, computes the amount from the actual cart
  (`CartService` total × 100 = cents, falling back to $50.00 when the cart is
  empty), asks the backend for a PaymentIntent, and confirms the payment with
  the mounted card element. Errors and success are shown as messages on the
  page instead of `alert()` popups. Because this app uses server-side
  rendering, Stripe.js is loaded only in the browser (`isPlatformBrowser`
  guard + dynamic import), so the server render can't crash on it.

### 8. The payment page wasn't part of the app
- **Symptom:** even a perfect payment page would have been unreachable — it
  had no route, and checkout never sent anyone to it.
- **Fix:** added a `/payment` route, made a valid card checkout navigate to
  it, and added a "Pay with Card (Stripe)" link on the checkout page. The
  prerendered build output now includes a real `payment` page.

### 9. The backend Stripe secret moved out of the file
- **Root cause:** `application.properties` contained the Stripe test secret
  key (`sk_test_…`) in plain text — fine on one laptop, unsafe anywhere else.
- **Fix:** it now reads `stripe.secret.key=${STRIPE_SECRET_KEY:}`, so the key
  is supplied through the `STRIPE_SECRET_KEY` environment variable.
- **Verified live:** with that variable set, `POST /api/payment/create-payment-intent`
  with `{amount: 5000, currency: "usd"}` returned HTTP 200 and a real
  `clientSecret` from Stripe's test API (a genuine PaymentIntent was created
  in test mode).

---

## Security configuration (affected everything)

### 10. The URL pattern that protected the API didn't match anything
- **Root cause:** the security rules used `requestMatchers("*/api/**")`. The
  leading `*/` requires a path segment *before* `/api`, so the pattern never
  matches real paths like `/api/chat` — the "authenticated" rule silently
  didn't protect what it was written for (this explains past 403 confusion:
  some paths behaved as if no rule existed).
- **Fix:** the matcher is now `/api/**`, with explicit public endpoints listed
  first: `/authenticate`, `/sign-up`, `/api/chat`, `/api/payment/**`, and
  `GET /api/v1/products/**` are `permitAll`; everything else requires a JWT.
- **Deliberate tradeoff to be able to explain:** making the chatbot and the
  create-payment-intent endpoint public is a *portfolio demo* choice so the
  shop works without an account. In production you would require sign-in for
  payment creation and compute prices on the server so shoppers can't tamper
  with the amount. That tradeoff is also written as a comment in
  `WebSecurityConfiguration.java`.

### 11. Two conflicting versions of the JWT library
- **Root cause:** `pom.xml` declared JJWT 0.11.5 (api/impl/jackson) **and**
  the legacy `jjwt` 0.9.1 artifact. Both put `io.jsonwebtoken` classes on the
  classpath, so which version the JVM loaded was luck — a classic source of
  random `NoSuchMethodError`s. The code (`JwtUtil`) uses the 0.11.5 API.
- **Fix:** removed the 0.9.1 dependency. Verified with `mvn dependency:tree`:
  only 0.11.5 remains.

---

## Extra bugs found while making it build and run

### 12. The backend didn't compile at all
- **Root cause:** `ChatbotController` calls `new ChatResponse(reply)`, but
  `ChatResponse` had no constructor that takes a String.
- **Fix:** added the missing constructors to `ChatResponse`.

### 13. The frontend build crashed prerendering the product list
- **Root cause:** the build statically prerendered every route. Prerendering
  runs `ProductListComponent` on the build machine, where its
  `GET /api/v1/products` request (a relative URL) has no reachable backend —
  the prerender worker died on that route, failing the whole build.
- **Fix:** in `app.routes.server.ts`, `product-list` is now
  `RenderMode.Server` (rendered on demand, when the app and its API are
  running — the right mode for a page showing live data). All other routes
  still prerender. The plain `npm install && npx ng build` now completes
  successfully.

### 14. Local run without MySQL (developer convenience)
- Added the H2 database dependency and an `application-h2.properties` profile
  so the backend can be run and tested anywhere with
  `--spring.profiles.active=h2`. The default MySQL configuration is
  untouched, so the app behaves exactly as before on a machine with MySQL.

---

## How the fixes were verified (actually run, not just compiled)

Backend (Temurin JDK 17 + Maven, H2 profile, secrets supplied as env vars):
- `mvn compile` — success.
- `mvn test` — 1 test run, 0 failures (the Spring context loads with the new
  security config and OpenAI bean).
- `GET /api/v1/products` → **200** (empty list on a fresh database).
- `POST /api/chat` with **no** OpenAI key → **200** with the graceful fallback
  message (server log shows OpenAI's real "you didn't provide an API key"
  response — the app reached OpenAI and degraded politely instead of 500ing).
- CORS preflight from `http://localhost:4200` → **200** with the correct
  `Access-Control-Allow-*` headers.
- `POST /api/payment/create-payment-intent` `{amount: 5000, currency: "usd"}`
  with the Stripe test secret in the environment → **200** with a real
  `clientSecret` issued by Stripe's test API.

Frontend (Node 24):
- `npm install && npx ng build` — completes with no errors; the `payment`
  page is present in the build output.

## Still needs Rathna (cannot be verified here)
1. A **new OpenAI API key** (revoke the exposed one first) exported as
   `OPENAI_API_KEY` — then a live chat answer can be tested end to end.
2. Her Stripe **publishable test key** pasted into
   `frontend/src/environments/environment.ts` — then a real browser checkout
   with a test card (e.g. 4242…) can be tested end to end.
3. One sandbox note: this test machine intercepts TLS and routes Java's
   network traffic in a non-standard way, so the test run needed extra JVM
   flags (IPv4 stack, the sandbox proxy, and its CA certificate). None of
   that is part of the app — on a normal laptop, `mvn spring-boot:run`
   with the two environment variables set is all it takes.

## Configuration & secrets (important)

No secrets live in this codebase anymore. Before running the backend, set these environment variables:

- `STRIPE_SECRET_KEY` — your Stripe **test** secret key (sk_test_...)
- `OPENAI_API_KEY` — your **new** OpenAI API key (revoke the old hard-coded one first)
- `DB_PASSWORD` — your local MySQL password (only needed for the default MySQL profile, not for the `h2` demo profile)
- `JWT_SECRET` — a Base64-encoded secret of at least 32 bytes, used to sign login tokens

Quick demo run without MySQL: start the backend with the `h2` profile (`--spring.profiles.active=h2`) plus the Stripe/OpenAI variables above. In the Angular frontend, put your Stripe **publishable** test key (pk_test_...) in `src/environments/environment.ts`.
