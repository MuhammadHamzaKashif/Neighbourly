document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const sidebar = document.querySelector("[data-sidebar]");
  const overlay = document.querySelector("[data-overlay]");
//alert("kkkkkkkk")
  if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("translate-x-full");
      overlay.classList.toggle("hidden");
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.add("translate-x-full");
      overlay.classList.add("hidden");
    });
  }
//alert("pppppppppp")
  const themeToggleBtn = document.querySelector("[data-theme-toggle]");
  const html = document.documentElement;

  if (themeToggleBtn) {
    if (localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    themeToggleBtn.addEventListener("click", () => {
      html.classList.toggle("dark");
      const isDark = html.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
//alert("oooooooo")
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
//alert("............")
  async function getId() {
    try {
            const response = await fetch('/api/user', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) { 
                const userData = await response.json();
                return userData.id
            }
            else {
                console.error("Failed to fetch user data")
            }
        }
        catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    }
  document.getElementById("request-form").addEventListener("submit", async function (e) {
  e.preventDefault();
//alert("aaaaaaaaaaaa")

const requestData = {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    dateNeeded: document.getElementById("date").value,
    timeNeeded: document.getElementById("time").value,
    urgency: document.querySelector("input[name='urgency']:checked")?.value,
    duration: document.getElementById("duration").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    zip: document.getElementById("zip").value,
    locationNotes: document.getElementById("location-notes").value,
    needsCar: document.getElementById("has-car").checked,
    needsExperience: document.getElementById("has-experience").checked,
    needsBackgroundCheck: document.getElementById("background-check").checked,
    volunteerPreference: document.getElementById("preferred-volunteers").value,
    specialInstructions: document.getElementById("special-instructions").value
};


  const userId = await getId();

  const response = await fetch(`/api/requests/create/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  });

  const result = await response.json();
  if (response.ok) {
    alert("Request submitted successfully!");
  } else {
    alert("Submission failed: " + result.message);
  }
});

});
