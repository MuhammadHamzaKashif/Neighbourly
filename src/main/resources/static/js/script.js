document.addEventListener("DOMContentLoaded", async () => {

    async function getVolunteerNameById(id) {
        try {
            console.log("VolunteerId: ", id);
            const response = await fetch(`/api/task/${id}/volunteerName`, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const username = await response.text();
                return username;
            }
            else {
                console.error("Failed to fetch data")
                return null;
            }
        }
        catch (error) {
            console.error("Failed to fetch user", error);
            return null;
        }
    }
    async function loadTasks() {
        try {
            const response = await fetch('/api/user', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const userData = await response.json();
                renderRequestedTasks(userData.postedTasks);
                renderVolunteeredTasks(userData.workedTasks);
            }
            else {
                console.error("Failed to fetch user data")
            }
        }
        catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    }



    function renderRequestedTasks(tasks) {
        const container = document.getElementById('requested-tasks');
        if (!tasks || tasks.length === 0) {
            const a = document.createElement('p');
            a.textContent = "No volunteered tasks";
            container.appendChild(a);
            return;
        }
        tasks.forEach(async task => {
            console.log("VolunteerId..............: ", task.id);
            const volunteerName = await getVolunteerNameById(parseInt(task.id));
            container.innerHTML += `                                    
                                <div class="request-card">
                                    <div class="request-header">
                                        <h3>${task.title}</h3>
                                        <span class="badge badge-primary">${task.status}</span>
                                    </div>
                                    <p class="request-description">${task.description}</p>
                                    <div class="request-meta">
                                        <div class="meta-item">
                                            <i data-lucide="clock"></i>
                                            <span>Tomorrow, 2:00 PM</span>
                                        </div>
                                        <div class="meta-item">
                                            <i data-lucide="users"></i>
                                            <span>Volunteer: ${volunteerName}</span>
                                        </div>
                                    </div>
                                </div>`
        })
    }

    function renderVolunteeredTasks(tasks) {
        const container = document.getElementById('volunteered-tasks');
        if (!tasks || tasks.length === 0) {
            const a = document.createElement('p');
            a.textContent = "No volunteered tasks";
            container.appendChild(a);
            return;
        }
        tasks.forEach(task => {
            container.innerHTML += `                                   
                                    <div class="request-card">
                                        <div class="request-header">
                                            <h3>${task.title}</h3>
                                            <span class="badge badge-primary">${task.status}</span>
                                        </div>
                                        <p class="request-description">${task.description}</p>
                                        <div class="request-meta">
                                            <div class="meta-item">
                                                <i data-lucide="clock"></i>
                                                <span>Friday, 3:00 PM</span>
                                            </div>
                                            <div class="meta-item">
                                                <i data-lucide="users"></i>
                                                <span>Volunteer: You</span>
                                            </div>
                                        </div>
                                    </div>`
        })
    }



    async function getUserByReqId(id) {
        try {
            const response = await fetch(`/api/requests/${id}/requester`, {
                method: "GET",
                credentials: "include"
            })
            if (response.ok) {
                return response.json();
            }
            else {
                console.error("Error in retrieving user");
                return null;
            }
        }
        catch (error) {
            console.error("Couldnt get user", error)
            return null;
        }

    }



    async function applyForRequest(request_id) {
        try {
            const response = await fetch(`/api/tasks/${request_id}`, {
                method: 'POST'
            });
            if (response.ok) {
                alert("Successfully applied")
            }
            else {
                console.error("Couldnt apply")
            }
        }
        catch (error) {
            console.error("Error applying", error)
        }

    }




    async function isAdmin(email) {
        try {
            const response = await fetch(`/api/user/is-admin?email=${encodeURIComponent(email)}`);
            if (!response.ok) throw new Error("Request failed");

            const result = await response.json();
            return result; // true or false
        } catch (err) {
            console.error("Error checking admin status:", err);
            return false;
        }
    }




    const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                credentials: "include"
            });
            if (response.ok) {
                // Redirect to login or home page
                window.location.href = "login.html"; // Change to your actual login route
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    });
}




    function goToAdminPanel() {
        // const testAuth = await fetch('http://localhost:8080/dashboard/admin', {
        //     credentials: 'include'
        // });

        // console.log("Auth test status:", testAuth.status);

        // Then redirect
        window.location.href = "http://localhost:8080/dashboard/admin";
    }


    const email = document.getElementById('userEmail').textContent;
    const check = await isAdmin(email);
    //alert(check)
    if (check) {
        const admBtn = document.createElement('button');
        admBtn.classList.add("btn", "btn-primary", "mt-2", "reqBtn");
        admBtn.textContent = "Admin Panel";
        admBtn.addEventListener('click', () => { goToAdminPanel(); })
        document.getElementById("sg-2").appendChild(admBtn);
    }







    const avaialbleReqs = document.getElementById('available-requests');

    async function renderAvailableTasks() {
        const response = await fetch('/api/requests/all', {
            method: "GET",
            credentials: "include"
        })
        if (response.ok) {
            const requests = await response.json()
            requests.forEach(async req => {

                const reqDate = new Date(req.dateNeeded);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (reqDate >= today && req.approved) {
                    const user = await getUserByReqId(req.id);

                    const requestDiv = document.createElement("div");
                    requestDiv.classList.add("request");


                    requestDiv.innerHTML = `
                            <div class="request-header">
                                <h3>${req.title}</h3>
                                <span class="badge badge-outline">Needs Volunteer</span>
                            </div>
                            <p class="request-description">${req.description}</p>
                            <div class="request-meta">
                                <div class="meta-item">
                                    <i data-lucide="clock"></i>
                                    <span>Required Date And Time</span>
                                    <span>${req.dateNeeded} ${req.timeNeeded}</span>
                                </div>
                                <div class="meta-item">
                                    <i data-lucide="users"></i>
                                    <span>Requested by: ${user.username}</span>
                                </div>
                            </div>
    `;

                    const button = document.createElement("button");
                    button.classList.add("btn", "btn-primary", "mt-2", "reqBtn");
                    button.textContent = "Apply";
                    button.addEventListener("click", () => applyForRequest(req.id));
                    requestDiv.appendChild(button);

                    avaialbleReqs.appendChild(requestDiv);
                }
            });



        }
    }

























    loadTasks();
    renderAvailableTasks();
    // Initialize Lucide icons
    const lucide = window.lucide // Declare lucide variable
    lucide.createIcons()

    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle")
    const themeIcon = themeToggle.querySelector("i")

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    //   if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    //     document.body.classList.add("dark")
    //     themeIcon.setAttribute("data-lucide", "sun")
    //   } else {
    //     themeIcon.setAttribute("data-lucide", "moon")
    //   }
    // Reinitialize the icon after changing its type
    //   lucide.createIcons({
    //     icons: {
    //       [themeIcon.getAttribute("data-lucide")]: themeIcon,
    //     },
    //   })
    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark")

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark")
            themeIcon.setAttribute("data-lucide", "sun")
        } else {
            localStorage.setItem("theme", "light")
            themeIcon.setAttribute("data-lucide", "moon")
        }

        // Reinitialize the icon after changing its type
        lucide.createIcons({
            icons: {
                [themeIcon.getAttribute("data-lucide")]: themeIcon,
            },
        })
    })

    // Tab functionality
    const tabTriggers = document.querySelectorAll(".tab-trigger")
    const tabContents = document.querySelectorAll(".tab-content")
    tabTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            // Remove active class from all triggers and contents
            tabTriggers.forEach((t) => t.classList.remove("active"))
            tabContents.forEach((c) => c.classList.remove("active"))

            // Add active class to clicked trigger and corresponding content
            trigger.classList.add("active")
            const tabId = trigger.getAttribute("data-tab")
            document.getElementById(`${tabId}-tab`).classList.add("active")
        })
    })

    // Form functionality for request-help page
    const useProfileAddressCheckbox = document.getElementById("use-profile-address")
    if (useProfileAddressCheckbox) {
        const addressFields = document.querySelectorAll("#address, #city, #zip")

        useProfileAddressCheckbox.addEventListener("change", function () {
            if (this.checked) {
                // Fill with dummy profile data
                document.getElementById("address").value = "123 Oak Street"
                document.getElementById("city").value = "Springfield"
                document.getElementById("zip").value = "12345"

                // Disable fields
                addressFields.forEach((field) => {
                    field.setAttribute("disabled", "disabled")
                })
            } else {
                // Clear and enable fields
                addressFields.forEach((field) => {
                    field.value = ""
                    field.removeAttribute("disabled")
                })
            }
        })
    }

    // Form submission (prevent default for demo)
    //   const forms = document.querySelectorAll("form")
    //   forms.forEach((form) => {
    //     form.addEventListener("submit", (e) => {
    //       e.preventDefault()
    //       alert("This is a demo. Form submission would happen here in a real application.")
    //     })
    //   })

    // Mobile sidebar toggle
    const sidebarToggle = document.createElement("button")
    sidebarToggle.className = "sidebar-toggle"
    sidebarToggle.innerHTML = '<i data-lucide="menu"></i>'
    document.querySelector(".main-content").prepend(sidebarToggle)

    lucide.createIcons({
        icons: {
            menu: sidebarToggle.querySelector("i"),
        },
    })

    sidebarToggle.addEventListener("click", () => {
        document.querySelector(".sidebar").classList.toggle("open")
    })

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
        const sidebar = document.querySelector(".sidebar")
        const sidebarToggleBtn = document.querySelector(".sidebar-toggle")

        if (
            window.innerWidth < 768 &&
            sidebar.classList.contains("open") &&
            !sidebar.contains(e.target) &&
            e.target !== sidebarToggleBtn &&
            !sidebarToggleBtn.contains(e.target)
        ) {
            sidebar.classList.remove("open")
        }
    })

    // Add responsive styles for mobile
    const style = document.createElement("style")
    style.textContent = `
    @media (max-width: 767px) {
      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: 1000;
      }
      
      .sidebar.open {
        transform: translateX(0);
      }
      
      .main-content {
        margin-left: 0;
      }
      
      .sidebar-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--radius);
        background-color: var(--card);
        border: 1px solid var(--border);
        color: var(--foreground);
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        z-index: 100;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
    }
    
    @media (min-width: 768px) {
      .sidebar-toggle {
        display: none;
      }
    }
  `
    document.head.appendChild(style)
})
