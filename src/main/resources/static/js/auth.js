document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded!"); // Changed from alert to console.log for better UX

  // Initialize Lucide icons
  const lucide = window.lucide;
  lucide.createIcons();

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add("dark");
    themeIcon.setAttribute("data-lucide", "sun");
  } else {
    themeIcon.setAttribute("data-lucide", "moon");
  }

  // Reinitialize the icon after changing its type
  lucide.createIcons({
    icons: {
      [themeIcon.getAttribute("data-lucide")]: themeIcon,
    },
  });

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      themeIcon.setAttribute("data-lucide", "sun");
    } else {
      localStorage.setItem("theme", "light");
      themeIcon.setAttribute("data-lucide", "moon");
    }

    lucide.createIcons({
      icons: {
        [themeIcon.getAttribute("data-lucide")]: themeIcon,
      },
    });
  });

  // Password visibility toggle
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

      lucide.createIcons({
        icons: {
          [toggleIcon.getAttribute("data-lucide")]: toggleIcon,
        },
      });
    });
  });

  // Login form handling
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const errorElement = document.getElementById("login-error");

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password
          }),
          credentials: 'include' // Important for session cookies
        });

        if (response.ok) {
          // Successful login - redirect to dashboard
          window.location.href = '/index.html';
        } else {
          // Show error message
          const errorData = await response.json();
          errorElement.textContent = errorData.message || "Login failed";
          errorElement.style.display = 'block';
        }
      } catch (error) {
        console.error('Login error:', error);
        errorElement.textContent = "Network error - please try again";
        errorElement.style.display = 'block';
      }
    });
  }

  // Signup form handling
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    // Password requirements check
    const reqLength = document.getElementById("req-length");
    const reqUppercase = document.getElementById("req-uppercase");
    const reqLowercase = document.getElementById("req-lowercase");
    const reqNumber = document.getElementById("req-number");

    if (password) {
      password.addEventListener("input", () => {
        const value = password.value;

        // Update requirement indicators
        reqLength.classList.toggle("requirement-met", value.length >= 8);
        reqUppercase.classList.toggle("requirement-met", /[A-Z]/.test(value));
        reqLowercase.classList.toggle("requirement-met", /[a-z]/.test(value));
        reqNumber.classList.toggle("requirement-met", /[0-9]/.test(value));
      });
    }

    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Sign up trying")
      const formData = {
        username: document.getElementById("username").value.trim(),
        //lastName: document.getElementById("last-name").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: password.value,
        confirmPassword: confirmPassword.value
      };

      // Client-side validation
      if (!validateSignupForm(formData)) {
        return;
      }

      try {
        console.log("Fetch krne laga");
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
        });
        
        console.log("fetch k bad");
        if (response.ok) {
          alert("Registration successful! Please login.");
          window.location.href = 'login.html';
        } else {
          const errorData = await response.json();
          showFormError(errorData.message || "Registration failed");
        }
      } catch (error) {
        console.error('Registration error:', error);
        showFormError("Network error - please try again");
      }
    });
  }

  // Helper functions
  function validateSignupForm(formData) {
    let isValid = true;
    const errors = {
      username: "",
      //lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    // First name validation
    if (!formData.username) {
      errors.username = "username is required";
      isValid = false;
    }

    // Last name validation
    // if (!formData.lastName) {
    //   errors.lastName = "Last name is required";
    //   isValid = false;
    // }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter";
      isValid = false;
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = "Password must contain at least one lowercase letter";
      isValid = false;
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = "Password must contain at least one number";
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Update error messages in UI
    Object.keys(errors).forEach(field => {
      const errorElement = document.getElementById(`${field}-error`);
      if (errorElement) {
        errorElement.textContent = errors[field];
      }
    });

    return isValid;
  }

  function showFormError(message) {
    const errorElement = document.getElementById("signup-error") || 
                         document.getElementById("login-error");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    } else {
      alert(message); // Fallback if no error element exists
    }
  }
});