document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    //alert("start")
    const passwordToggle = document.querySelector(".password-toggle");
    if (passwordToggle) {
        const toggleIcon = passwordToggle.querySelector("i");
        const passwordInput = passwordToggle.parentElement.querySelector("input");

        passwordToggle.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                toggleIcon.setAttribute("data-lucide", "eye-off");
            } else {
                passwordInput.type = "password";
                toggleIcon.setAttribute("data-lucide", "eye");
            }
            lucide.createIcons();
        });
    }
    //alert("bbbbbbbbbbbbbbbbbbbbbbbb")
    //   const themeToggle = document.getElementById("theme-toggle");
    //   if (themeToggle) {
    //     const themeIcon = themeToggle.querySelector("i");

    //     // Check for saved theme preference or use system preference
    //     const savedTheme = localStorage.getItem("theme");
    //     const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    //     if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    //       document.body.classList.add("dark");
    //       themeIcon.setAttribute("data-lucide", "sun");
    //     } else {
    //       themeIcon.setAttribute("data-lucide", "moon");
    //     }
    //     lucide.createIcons();

    //     themeToggle.addEventListener("click", () => {
    //       document.body.classList.toggle("dark");
    //       const isDark = document.body.classList.contains("dark");
    //       localStorage.setItem("theme", isDark ? "dark" : "light");
    //       themeIcon.setAttribute("data-lucide", isDark ? "sun" : "moon");
    //       lucide.createIcons();
    //     });
    //   }

    //alert("aaaaaaaaaaaaaaaaa")

async function isAdmin(email) {
    try {
        const response = await fetch(`/api/user/is-admin?email=${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error("Request failed");

        const result = await response.json();
        return result;
    } catch (err) {
        console.error("Error checking admin status:", err);
        return false;
    }
}



    const loginForm = document.getElementById("login-form");
    //alert("..........................................");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Login form submitted");


            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const errorElement = document.getElementById("login-error");

            if (!email || !password) {
                errorElement.textContent = "Please fill in all fields";
                errorElement.style.display = "block";
                return;
            }

            try {

                const response = await fetch('http://localhost:8080/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                    credentials: 'include'
                });
                //const data = await response.json();

                if (response.ok) {
                    alert("Login successful, redirecting...");

                //     if (isAdmin(email)){
                //     const testAuth = await fetch('http://localhost:8080/dashboard/admin', {
                //         credentials: 'include'
                //     });

                //     console.log("Auth test status:", testAuth.status);

                //     // Then redirect
                //     window.location.href = "http://localhost:8080/dashboard/admin";
                // }
                // else{
                    const testAuth = await fetch('http://localhost:8080/dashboard', {
                        credentials: 'include'
                    });

                    console.log("Auth test status:", testAuth.status);

                    window.location.href = "http://localhost:8080/dashboard";
                // }
                } else {
                    const errorData = await response.json();
                    errorElement.textContent = errorData.message || "Login failed";
                    errorElement.style.display = "block";
                }
            } catch (error) {
                console.error("Login error:", error);
                errorElement.textContent = "Network error - please try again";
                errorElement.style.display = "block";
            }
        });
    }

    const forgotPasswordLink = document.querySelector(".forgot-password");
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Password reset functionality coming soon!");
        });
    }

});