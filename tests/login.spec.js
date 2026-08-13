const { test, expect } = require("@playwright/test");

// Before every test, start on the login page.
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

// ---------------------------
// POSITIVE TEST
// (valid input, should work correctly)
// ---------------------------
test("1. Successful login with valid credentials", async ({ page }) => {
  await page.getByTestId("login-email").fill("test@example.com");
  await page.getByTestId("login-password").fill("Test@123");
  await page.getByTestId("login-button").click();

  const message = page.getByTestId("login-message");
  await expect(message).toBeVisible();
  await expect(message).toHaveText("Login successful");
});

// ---------------------------
// NEGATIVE TESTS
// (invalid input, app should show the correct error instead of breaking)
// ---------------------------
test("2. Login with incorrect password", async ({ page }) => {
  await page.getByTestId("login-email").fill("test@example.com");
  await page.getByTestId("login-password").fill("WrongPassword");
  await page.getByTestId("login-button").click();

  await expect(page.getByTestId("login-message")).toHaveText(
    "Invalid email or password."
  );
});

test("3. Login with empty email", async ({ page }) => {
  await page.getByTestId("login-email").fill("");
  await page.getByTestId("login-password").fill("Test@123");
  await page.getByTestId("login-button").click();

  await expect(page.getByTestId("login-message")).toHaveText(
    "Email is required."
  );
});

test("4. Login with empty password", async ({ page }) => {
  await page.getByTestId("login-email").fill("test@example.com");
  await page.getByTestId("login-password").fill("");
  await page.getByTestId("login-button").click();

  await expect(page.getByTestId("login-message")).toHaveText(
    "Password is required."
  );
});

test("5. Login with invalid email format", async ({ page }) => {
  await page.getByTestId("login-email").fill("not-an-email");
  await page.getByTestId("login-password").fill("Test@123");
  await page.getByTestId("login-button").click();

  await expect(page.getByTestId("login-message")).toHaveText(
    "Please enter a valid email address."
  );
});

test("6. Login with an email that is not registered", async ({ page }) => {
  // Correctly formatted email, but it does not match our dummy user.
  // This checks the app does not wrongly log in an unknown user.
  await page.getByTestId("login-email").fill("unknown@example.com");
  await page.getByTestId("login-password").fill("Test@123");
  await page.getByTestId("login-button").click();

  await expect(page.getByTestId("login-message")).toHaveText(
    "Invalid email or password."
  );
});
