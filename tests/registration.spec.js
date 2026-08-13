const { test, expect } = require("@playwright/test");

// Small helper to keep tests short and avoid repeating
// the same four `.fill()` calls in every test.
async function fillRegisterForm(page, { fullName, email, password, confirmPassword }) {
  await page.getByTestId("register-fullname").fill(fullName);
  await page.getByTestId("register-email").fill(email);
  await page.getByTestId("register-password").fill(password);
  await page.getByTestId("register-confirm-password").fill(confirmPassword);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/register.html");
});

// ---------------------------
// POSITIVE TEST
// ---------------------------
test("1. Successful registration", async ({ page }) => {
  await fillRegisterForm(page, {
    fullName: "Raushan Pandey",
    email: "newuser@example.com",
    password: "Test@123",
    confirmPassword: "Test@123",
  });
  await page.getByTestId("register-button").click();

  const message = page.getByTestId("register-message");
  await expect(message).toBeVisible();
  await expect(message).toHaveText("Registration successful");
});

// ---------------------------
// NEGATIVE TESTS
// ---------------------------
test("2. Registration with empty required fields", async ({ page }) => {
  // Leave everything empty and submit straight away.
  await page.getByTestId("register-button").click();

  await expect(page.getByTestId("register-message")).toHaveText(
    "Full name is required."
  );
});

test("3. Registration with invalid email", async ({ page }) => {
  await fillRegisterForm(page, {
    fullName: "Raushan Pandey",
    email: "invalid-email",
    password: "Test@123",
    confirmPassword: "Test@123",
  });
  await page.getByTestId("register-button").click();

  await expect(page.getByTestId("register-message")).toHaveText(
    "Please enter a valid email address."
  );
});

test("4. Registration with password mismatch", async ({ page }) => {
  await fillRegisterForm(page, {
    fullName: "Raushan Pandey",
    email: "newuser@example.com",
    password: "Test@123",
    confirmPassword: "Different@123",
  });
  await page.getByTestId("register-button").click();

  await expect(page.getByTestId("register-message")).toHaveText(
    "Passwords do not match."
  );
});

test("5. Registration with short password", async ({ page }) => {
  await fillRegisterForm(page, {
    fullName: "Raushan Pandey",
    email: "newuser@example.com",
    password: "123",
    confirmPassword: "123",
  });
  await page.getByTestId("register-button").click();

  await expect(page.getByTestId("register-message")).toHaveText(
    "Password must be at least 6 characters long."
  );
});

test("6. Registration with an already-registered email", async ({ page }) => {
  // Easy edge case: try to register using the same email as the
  // demo login user. Our simple app does not block this (there is
  // no real database), so it still succeeds. This test documents
  // that current, real behaviour -- in a real app with a database,
  // this should instead show a "this email is already registered" error.
  await fillRegisterForm(page, {
    fullName: "Raushan Pandey",
    email: "test@example.com",
    password: "Test@123",
    confirmPassword: "Test@123",
  });
  await page.getByTestId("register-button").click();

  await expect(page.getByTestId("register-message")).toHaveText(
    "Registration successful"
  );
});
