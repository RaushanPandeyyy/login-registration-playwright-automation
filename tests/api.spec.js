const { test, expect } = require("@playwright/test");

// Basic API test. This does not open a browser page -- it just sends
// a plain HTTP request straight to our server, using Playwright's
// built-in "request" tool. This is different from the UI tests above,
// which click buttons and read text on a page.

test("1. API health check returns success status", async ({ request }) => {
  const response = await request.get("/api/health");

  expect(response.ok()).toBeTruthy(); // status code is in the 200-299 range
  expect(response.status()).toBe(200);
});

test("2. API health check response has expected data", async ({ request }) => {
  const response = await request.get("/api/health");
  const body = await response.json();

  expect(body.status).toBe("success");
  expect(body.message).toBe("API is working");
});
