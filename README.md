# Login & Registration Test Automation

## 1. What This Project Is
A small, beginner-friendly web app (Login + Registration) with an automated
**Playwright** test suite. It is built to practice and show core SDET/QA
skills for the **Springworks SDET Intern** role: writing test cases,
positive and negative testing, using assertions and locators correctly,
and doing basic API testing.

## 2. Technologies Used
**Application:** HTML, CSS, JavaScript, Node.js (only used to run a tiny
static file server + one API endpoint — no framework, no database)

**Automation:** Playwright, JavaScript

## 3. Project Structure
```
login-registration-automation/
├── app/
│   ├── index.html
│   ├── register.html
│   ├── style.css
│   └── script.js
├── tests/
│   ├── login.spec.js
│   ├── registration.spec.js
│   └── api.spec.js
├── server.js
├── playwright.config.js
├── package.json
└── README.md
```

## 4. Application Features

### Login Page (`index.html`)
- Correct credentials → "Login successful"
- Wrong password → "Invalid email or password."
- Unregistered email → "Invalid email or password."
- Empty email → "Email is required."
- Empty password → "Password is required."
- Invalid email format → "Please enter a valid email address."
- Demo login: `test@example.com` / `Test@123`

### Registration Page (`register.html`)
- Valid details → "Registration successful"
- Empty required fields → field-specific message
- Invalid email → "Please enter a valid email address."
- Password/Confirm Password mismatch → "Passwords do not match."
- Password shorter than 6 characters → "Password must be at least 6 characters long."

There is no real backend or database — this is intentional, to keep the
project simple and beginner-friendly.

### Simple API (`GET /api/health`)
One small API endpoint was added so we could also practice basic API
testing, not just UI testing:
```
GET /api/health
Response: { "status": "success", "message": "API is working" }
```

## 5. What Is Being Tested and Why
We test the two most important user flows in almost any web app — logging
in and signing up — because these are the flows every real company cares
about getting right. For each flow we test:
- The "happy path" (correct input works) — this is **positive testing**.
- The common ways a user can get it wrong (missing fields, bad email,
  wrong password, mismatched passwords, short password) — this is
  **negative testing**. Most real bugs are found here, not on the happy path.

## 6. Test Files

**`tests/login.spec.js`** — 6 tests
1. Successful login with valid credentials (positive)
2. Login with incorrect password (negative)
3. Login with empty email (negative)
4. Login with empty password (negative)
5. Login with invalid email format (negative)
6. Login with an email that is not registered (negative)

**`tests/registration.spec.js`** — 6 tests
1. Successful registration (positive)
2. Registration with empty required fields (negative)
3. Registration with invalid email (negative)
4. Registration with password mismatch (negative)
5. Registration with short password (negative)
6. Registration with an already-registered email (negative — documents
   current real behaviour of this simple app, since there is no database
   to block duplicate emails)

**`tests/api.spec.js`** — 2 tests
1. API returns a successful status code
2. API response contains the expected data

## 7. Testing Concepts Explained (Easy English)

**Assertion** — A check that says "this must be true, or the test fails."
Example: `expect(message).toHaveText("Login successful")` means we expect
that exact text to appear.

**Locator** — How Playwright finds an element on the page, like an email
box or a button. We use `getByTestId()`, which looks for a
`data-testid` attribute in the HTML. This is stable — it does not break
if someone changes the page's CSS styling later.

**Test Isolation** — Every test should be independent and not depend on
another test running first. We use `beforeEach()` to open a fresh page
before every single test, so each test starts clean.

**Positive Testing** — Testing with correct, valid input to confirm the
feature works as expected.

**Negative Testing** — Testing with wrong or missing input to confirm the
app fails safely and shows the right error message, instead of breaking.

**Failure Scenarios** — The specific ways a feature can go wrong that we
deliberately test for: wrong credentials, missing fields, invalid email
format, mismatched passwords, and a too-short password.

**Basic Regression Testing** — Running the whole test suite again after
making any change to the app, to quickly check that nothing that used to
work has broken. In this project, that's simply running `npm test` — the
same 14 tests check login, registration, and the API every time.

**API Testing** — Testing a server endpoint directly (by sending a
request and checking the response), without opening a browser page. This
is faster than UI testing and useful for checking backend logic on its own.

## 8. How to Install
```bash
npm install
npx playwright install
```
The first command installs Playwright's test library. The second
downloads the actual browser (Chromium) that Playwright uses to run tests.

## 9. How to Start the Application
```bash
npm start
```
Then open `http://127.0.0.1:3000` in a browser to use the app manually.

## 10. How to Run All Tests
```bash
npm test
```
This automatically starts the app, runs all 14 tests (6 login + 6
registration + 2 API) in a real browser, and shuts the app down
afterward. You do not need to start the server yourself first.

Run this same command any time after changing the app's code — it acts
as a basic regression check that existing login/registration behaviour
still works.

To watch the tests run visually in a browser window:
```bash
npm run test:headed
```

## 11. How to View the Test Report
```bash
npm run report
```
This opens an HTML report showing which tests passed/failed, how long
each took, and — for any failing test — a screenshot of what the page
looked like at the moment it failed (screenshots on failure are turned
on in `playwright.config.js`).

## 12. What Was Intentionally Left Out (and Why)
This project focuses on core, beginner-level SDET skills. The following
from the Springworks JD were intentionally **not** added, because they
are more advanced than what a beginner project needs:
- TypeScript, Selenium, Cypress, Mocha, Sinon, Chai
- Docker, AWS, complex CI/CD pipelines
- A real database, authentication tokens, complex backend architecture
- Complex mocking/stubbing or advanced test fixtures

These are reasonable next steps for later, not requirements for this
project.
