// ---------------------------------------------------
// Dummy "database" — just a single hardcoded user.
// In a real app this would live on a server + database.
// Here it's local on purpose, to keep the project simple.
// ---------------------------------------------------
const DUMMY_USER = {
  email: "test@example.com",
  password: "Test@123",
};

// Simple, readable email format check.
// Not meant to be a perfect RFC-compliant regex — just
// good enough to reject obviously invalid emails like
// "abc" or "abc@" or "abc.com".
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function showMessage(element, text, type) {
  element.textContent = text;
  element.className = type; // "success" or "error"
}

// ---------------------------------------------------
// LOGIN PAGE LOGIC
// ---------------------------------------------------
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");
    const messageEl = document.getElementById("login-message");

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // 1. Empty email check
    if (email === "") {
      showMessage(messageEl, "Email is required.", "error");
      return;
    }

    // 2. Empty password check
    if (password === "") {
      showMessage(messageEl, "Password is required.", "error");
      return;
    }

    // 3. Email format check
    if (!isValidEmail(email)) {
      showMessage(messageEl, "Please enter a valid email address.", "error");
      return;
    }

    // 4. Credential check
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      showMessage(messageEl, "Login successful", "success");
    } else {
      // Deliberately generic — a real system shouldn't reveal
      // whether the email or the password was the wrong part.
      showMessage(messageEl, "Invalid email or password.", "error");
    }
  });
}

// ---------------------------------------------------
// REGISTRATION PAGE LOGIC
// ---------------------------------------------------
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullNameInput = document.getElementById("register-fullname");
    const emailInput = document.getElementById("register-email");
    const passwordInput = document.getElementById("register-password");
    const confirmPasswordInput = document.getElementById(
      "register-confirm-password"
    );
    const messageEl = document.getElementById("register-message");

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // 1. Empty required fields
    if (fullName === "") {
      showMessage(messageEl, "Full name is required.", "error");
      return;
    }
    if (email === "") {
      showMessage(messageEl, "Email is required.", "error");
      return;
    }
    if (password === "") {
      showMessage(messageEl, "Password is required.", "error");
      return;
    }
    if (confirmPassword === "") {
      showMessage(messageEl, "Please confirm your password.", "error");
      return;
    }

    // 2. Email format check
    if (!isValidEmail(email)) {
      showMessage(messageEl, "Please enter a valid email address.", "error");
      return;
    }

    // 3. Password length check
    if (password.length < 6) {
      showMessage(
        messageEl,
        "Password must be at least 6 characters long.",
        "error"
      );
      return;
    }

    // 4. Password match check
    if (password !== confirmPassword) {
      showMessage(messageEl, "Passwords do not match.", "error");
      return;
    }

    // All checks passed
    showMessage(messageEl, "Registration successful", "success");
  });
}
