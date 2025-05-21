document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons
    const lucide = window.lucide
    //lucide.createIcons()
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', 'toggle light mode');
    }

    loadRequests();

    async function loadRequests() {
        try {
            const response = await fetch('/api/requests/all', {
                method: "GET",
                credentials: "include"
            })
            if (response.ok) {
                const requests = await response.json();
                const container = document.getElementById("requests-container");
                requests.forEach(req => {
                    console.log(req);
                    alert(req.approved);
                    if (!req.approved) {
                        container.innerHTML += `
            <div class="admin-request-card" data-id="${req.id}" data-status="pending">
                <div class="request-header">
                    <div class="request-title-section">
                        <h2 class="request-title">${req.title}</h2>
                        <span class="request-id">#${req.id}</span>
                        <span class="badge badge-pending">Pending</span>
                    </div>
                    <div class="request-actions">
                        <button class="btn btn-approve" data-id="${req.id}">
                            <i data-lucide="check"></i>
                            Approve
                        </button>
                        <button class="btn btn-deny" data-id="${req.id}">
                            <i data-lucide="x"></i>
                            Deny
                        </button>
                        <button class="btn btn-outline btn-expand">
                            <i data-lucide="chevron-down"></i>
                        </button>
                    </div>
                </div>
                <div class="request-summary">
                    <div class="request-detail">
                        <i data-lucide="map-pin"></i>
                        <span>${req.address}, ${req.city}, ${req.zip}</span>
                    </div>
                    <div class="request-detail">
                        <i data-lucide="tag"></i>
                        <span>Category: ${req.category}</span>
                    </div>
                    <div class="request-detail">
                        <i data-lucide="calendar"></i>
                        <span>Needed: ${req.dateNeeded} - ${req.timeNeeded}</span>
                    </div>
                    <div class="request-detail">
                        <i data-lucide="clock"></i>
                        <span>Duration: ${req.duration}</span>
                    </div>
                    <div class="request-detail">
                        <i data-lucide="alert-triangle"></i>
                        <span>Urgency: ${req.urgency}</span>
                    </div>
   
                </div>
                <div class="request-details hidden">
                    <div class="details-section">
                        <h3>Description</h3>
                        <p>${req.description}</p>
                    </div>
                    <!-- More details omitted for brevity -->
                </div>
            </div>
        `;

                        // Add event listeners for approve and deny buttons
                        const approveButton = container.querySelector(`button.btn-approve[data-id="${req.id}"]`);
                        const denyButton = container.querySelector(`button.btn-deny[data-id="${req.id}"]`);

                        approveButton.addEventListener('click', function () {
                            // Handle approval logic here
                            console.log(`Request #${req.id} approved.`);
                            // For example, change the request status to 'approved' and update the UI
                            approveRequest(req.id);
                        });

                        denyButton.addEventListener('click', function () {
                            // Handle denial logic here
                            console.log(`Request #${req.id} denied.`);
                            // For example, change the request status to 'denied' and update the UI
                            denyRequest(req.id);
                        });
                    }
                });

                // Functions to handle approval and denial
                async function approveRequest(requestId) {
                    try {
                        const response = await fetch(`/api/requests/${requestId}/approve`, {
                            method: "PUT",
                        });

                        if (!response.ok) {
                            // Handle error if request was not successful
                            const errorMessage = await response.text();
                            console.error(`Failed to approve request #${requestId}: ${errorMessage}`);
                            return;
                        }

                        console.log(`Request #${requestId} approved in the system.`);

                        // Optionally, update the UI to reflect the approval (e.g., hide the card or change status)
                        const requestCard = document.querySelector(`.admin-request-card[data-id="${requestId}"]`);
                        if (requestCard) {
                            requestCard.querySelector('.badge').textContent = "Approved";
                            requestCard.setAttribute('data-status', 'approved');
                            // Optionally, you could hide or disable the approve/deny buttons
                            const approveButton = requestCard.querySelector('.btn-approve');
                            const denyButton = requestCard.querySelector('.btn-deny');
                            approveButton.disabled = true;
                            denyButton.disabled = true;
                        }
                    } catch (error) {
                        console.error(`Error approving request #${requestId}: ${error}`);
                    }
                }


                async function denyRequest(requestId) {
                    try {
                        const response = await fetch(`/api/requests/${requestId}/deny`, {
                            method: "PUT",
                        });

                        if (!response.ok) {
                            // Handle error if request was not successful
                            const errorMessage = await response.text();
                            console.error(`Failed to deny request #${requestId}: ${errorMessage}`);
                            return;
                        }

                        console.log(`Request #${requestId} denied in the system.`);

                        // Optionally, update the UI to reflect the denial (e.g., hide the card or change status)
                        const requestCard = document.querySelector(`.admin-request-card[data-id="${requestId}"]`);
                        if (requestCard) {
                            requestCard.querySelector('.badge').textContent = "Denied";
                            requestCard.setAttribute('data-status', 'denied');
                            // Optionally, you could hide or disable the approve/deny buttons
                            const approveButton = requestCard.querySelector('.btn-approve');
                            const denyButton = requestCard.querySelector('.btn-deny');
                            approveButton.disabled = true;
                            denyButton.disabled = true;
                        }
                    } catch (error) {
                        console.error(`Error denying request #${requestId}: ${error}`);
                    }
                }



            }
        }
        catch (error) {
            console.error("Error trying to get requests", error)
        }
    }


    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle")
    const themeIcon = themeToggle.querySelector("i")

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    // if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    //     document.body.classList.add("dark")
    //     themeIcon.setAttribute("data-lucide", "sun")
    // } else {
    //     themeIcon.setAttribute("data-lucide", "moon")
    // }

    // Reinitialize the icon after changing its type
    lucide.createIcons({
        icons: {
            [themeIcon.getAttribute("data-lucide")]: themeIcon,
        },
    })

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

    // Expand/collapse request details
    const expandButtons = document.querySelectorAll(".btn-expand")
    expandButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest(".admin-request-card")
            const details = card.querySelector(".request-details")
            const icon = button.querySelector("i")

            details.classList.toggle("hidden")

            if (details.classList.contains("hidden")) {
                icon.setAttribute("data-lucide", "chevron-down")
            } else {
                icon.setAttribute("data-lucide", "chevron-up")
            }

            // Reinitialize the icon after changing its type
            lucide.createIcons({
                icons: {
                    [icon.getAttribute("data-lucide")]: icon,
                },
            })
        })
    })

    // Approve request
    const approveButtons = document.querySelectorAll(".btn-approve")
    approveButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const requestId = button.getAttribute("data-id")
            const card = button.closest(".admin-request-card")
            const badge = card.querySelector(".badge")

            // Update UI
            badge.className = "badge badge-approved"
            badge.textContent = "Approved"
            card.setAttribute("data-status", "approved")

            // Disable buttons
            button.disabled = true
            card.querySelector(".btn-deny").disabled = true

            // Show confirmation
            showNotification(`Request #${requestId} has been approved`, "success")

            // In a real application, you would send an API request here
            console.log(`Approved request ${requestId}`)
        })
    })

    // Deny request
    const denyButtons = document.querySelectorAll(".btn-deny")
    denyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const requestId = button.getAttribute("data-id")
            const card = button.closest(".admin-request-card")
            const badge = card.querySelector(".badge")

            // Update UI
            badge.className = "badge badge-denied"
            badge.textContent = "Denied"
            card.setAttribute("data-status", "denied")

            // Disable buttons
            button.disabled = true
            card.querySelector(".btn-approve").disabled = true

            // Show confirmation
            showNotification(`Request #${requestId} has been denied`, "error")

            // In a real application, you would send an API request here
            console.log(`Denied request ${requestId}`)
        })
    })

    // Filter requests
    const filterSelect = document.getElementById("filter-status")
    filterSelect.addEventListener("change", () => {
        const status = filterSelect.value
        const cards = document.querySelectorAll(".admin-request-card")

        cards.forEach((card) => {
            if (status === "all" || card.getAttribute("data-status") === status) {
                card.style.display = "block"
            } else {
                card.style.display = "none"
            }
        })
    })

    // Search functionality
    const searchInput = document.getElementById("search-requests")
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase()
        const cards = document.querySelectorAll(".admin-request-card")

        cards.forEach((card) => {
            const title = card.querySelector(".request-title").textContent.toLowerCase()
            const description = card.querySelector(".details-section p").textContent.toLowerCase()
            const address = card.querySelector(".request-detail:first-child span").textContent.toLowerCase()

            if (title.includes(searchTerm) || description.includes(searchTerm) || address.includes(searchTerm)) {
                card.style.display = "block"
            } else {
                card.style.display = "none"
            }
        })
    })

    // Notification function
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement("div")
        notification.className = `notification notification-${type}`

        // Create icon based on type
        const icon = document.createElement("i")
        icon.setAttribute("data-lucide", type === "success" ? "check-circle" : "alert-circle")

        // Create message element
        const messageElement = document.createElement("span")
        messageElement.textContent = message

        // Append elements
        notification.appendChild(icon)
        notification.appendChild(messageElement)

        // Add to document
        document.body.appendChild(notification)

        // Initialize icon
        lucide.createIcons({
            icons: {
                [icon.getAttribute("data-lucide")]: icon,
            },
        })

        // Show notification
        setTimeout(() => {
            notification.classList.add("show")
        }, 10)

        // Hide and remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove("show")
            setTimeout(() => {
                notification.remove()
            }, 300)
        }, 3000)
    }

    // Pagination functionality (simplified for demo)
    const paginationButtons = document.querySelectorAll(".pagination-btn")
    paginationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.classList.contains("active") || button.classList.contains("pagination-ellipsis")) {
                return
            }

            document.querySelector(".pagination-btn.active").classList.remove("active")
            if (!button.classList.contains("pagination-next")) {
                button.classList.add("active")
            } else {
                // If next button, activate the next page
                const activePage = Number.parseInt(document.querySelector(".pagination-btn.active").textContent)
                const nextPageButton = document.querySelector(`.pagination-btn:nth-child(${activePage + 1})`)
                if (nextPageButton && !nextPageButton.classList.contains("pagination-ellipsis")) {
                    nextPageButton.classList.add("active")
                }
            }
<<<<<<< Updated upstream

            // In a real application, you would load the next page of data here
=======
>>>>>>> Stashed changes
            showNotification("Loading page data...", "success")
        })
    })
})
