document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const passwordToggles = document.querySelectorAll(".password-toggle");
  passwordToggles.forEach((toggle) => {
    const toggleIcon = toggle.querySelector("i");
    const passwordInput = toggle.parentElement.querySelector("input");

    toggle.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.setAttribute("data-lucide", "eye-off");
      } else {
        passwordInput.type = "password";
        toggleIcon.setAttribute("data-lucide", "eye");
      }
      lucide.createIcons();
    });
  });

  const password = document.getElementById("password");
  const reqLength = document.getElementById("req-length");
  const reqUppercase = document.getElementById("req-uppercase");
  const reqLowercase = document.getElementById("req-lowercase");
  const reqNumber = document.getElementById("req-number");

  if (password) {
    password.addEventListener("input", () => {
      const value = password.value;
      reqLength.classList.toggle("valid", value.length >= 8);
      reqUppercase.classList.toggle("valid", /[A-Z]/.test(value));
      reqLowercase.classList.toggle("valid", /[a-z]/.test(value));
      reqNumber.classList.toggle("valid", /[0-9]/.test(value));
    });
  }

  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      document.querySelectorAll(".error-message").forEach(el => {
        el.textContent = "";
        el.style.display = "none";
      });

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const termsChecked = document.getElementById("terms").checked;

      let isValid = true;

      if (!username) {
        document.getElementById("username-error").textContent = "Username is required";
        document.getElementById("username-error").style.display = "block";
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        document.getElementById("email-error").textContent = "Email is required";
        document.getElementById("email-error").style.display = "block";
        isValid = false;
      } else if (!emailRegex.test(email)) {
        document.getElementById("email-error").textContent = "Please enter a valid email address";
        document.getElementById("email-error").style.display = "block";
        isValid = false;
      }

      if (!password) {
        document.getElementById("password-error").textContent = "Password is required";
        document.getElementById("password-error").style.display = "block";
        isValid = false;
      } else if (password.length < 8) {
        document.getElementById("password-error").textContent = "Password must be at least 8 characters";
        document.getElementById("password-error").style.display = "block";
        isValid = false;
      } else if (!/[A-Z]/.test(password)) {
        document.getElementById("password-error").textContent = "Password must contain at least one uppercase letter";
        document.getElementById("password-error").style.display = "block";
        isValid = false;
      } else if (!/[a-z]/.test(password)) {
        document.getElementById("password-error").textContent = "Password must contain at least one lowercase letter";
        document.getElementById("password-error").style.display = "block";
        isValid = false;
      } else if (!/[0-9]/.test(password)) {
        document.getElementById("password-error").textContent = "Password must contain at least one number";
        document.getElementById("password-error").style.display = "block";
        isValid = false;
      }

      if (!confirmPassword) {
        document.getElementById("confirm-password-error").textContent = "Please confirm your password";
        document.getElementById("confirm-password-error").style.display = "block";
        isValid = false;
      } else if (confirmPassword !== password) {
        document.getElementById("confirm-password-error").textContent = "Passwords do not match";
        document.getElementById("confirm-password-error").style.display = "block";
        isValid = false;
      }

      if (!termsChecked) {
        document.getElementById("terms-error").textContent = "You must agree to the terms and conditions";
        document.getElementById("terms-error").style.display = "block";
        isValid = false;
      }

      if (isValid) {
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password
            })
          });

          if (response.ok) {
            alert("Registration successful! Redirecting to login...");
            window.location.href = "login.html";
          } else {
            const errorData = await response.json();
            if (errorData.message) {
              alert(errorData.message);
            } else {
              alert("Registration failed. Please try again.");
            }
          }
        } catch (error) {
          console.error('Registration error:', error);
          alert("An error occurred. Please try again.");
        }
      }
    });
  }

  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add("dark");
    themeIcon.setAttribute("data-lucide", "sun");
  } else {
    themeIcon.setAttribute("data-lucide", "moon");
  }
  lucide.createIcons();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeIcon.setAttribute("data-lucide", isDark ? "sun" : "moon");
    lucide.createIcons();
  });
});