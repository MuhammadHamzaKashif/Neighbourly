document.addEventListener("DOMContentLoaded", () => {
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
                </div>
            </div>
        `;

                        const approveButton = container.querySelector(`button.btn-approve[data-id="${req.id}"]`);
                        const denyButton = container.querySelector(`button.btn-deny[data-id="${req.id}"]`);

                        approveButton.addEventListener('click', function () {
                            console.log(`Request #${req.id} approved.`);
                            approveRequest(req.id);
                        });

                        denyButton.addEventListener('click', function () {
                            console.log(`Request #${req.id} denied.`);
                            denyRequest(req.id);
                        });
                    }
                });

                async function approveRequest(requestId) {
                    try {
                        const response = await fetch(`/api/requests/${requestId}/approve`, {
                            method: "PUT",
                        });

                        if (!response.ok) {
                            const errorMessage = await response.text();
                            console.error(`Failed to approve request #${requestId}: ${errorMessage}`);
                            return;
                        }

                        console.log(`Request #${requestId} approved in the system.`);

                        const requestCard = document.querySelector(`.admin-request-card[data-id="${requestId}"]`);
                        if (requestCard) {
                            requestCard.querySelector('.badge').textContent = "Approved";
                            requestCard.setAttribute('data-status', 'approved');
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
                            const errorMessage = await response.text();
                            console.error(`Failed to deny request #${requestId}: ${errorMessage}`);
                            return;
                        }

                        console.log(`Request #${requestId} denied in the system.`);

                        const requestCard = document.querySelector(`.admin-request-card[data-id="${requestId}"]`);
                        if (requestCard) {
                            requestCard.querySelector('.badge').textContent = "Denied";
                            requestCard.setAttribute('data-status', 'denied');
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


    const themeToggle = document.getElementById("theme-toggle")
    const themeIcon = themeToggle.querySelector("i")

    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    // if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    //     document.body.classList.add("dark")
    //     themeIcon.setAttribute("data-lucide", "sun")
    // } else {
    //     themeIcon.setAttribute("data-lucide", "moon")
    // }

    lucide.createIcons({
        icons: {
            [themeIcon.getAttribute("data-lucide")]: themeIcon,
        },
    })

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark")

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark")
            themeIcon.setAttribute("data-lucide", "sun")
        } else {
            localStorage.setItem("theme", "light")
            themeIcon.setAttribute("data-lucide", "moon")
        }

        lucide.createIcons({
            icons: {
                [themeIcon.getAttribute("data-lucide")]: themeIcon,
            },
        })
    })

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

            lucide.createIcons({
                icons: {
                    [icon.getAttribute("data-lucide")]: icon,
                },
            })
        })
    })

    const approveButtons = document.querySelectorAll(".btn-approve")
    approveButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const requestId = button.getAttribute("data-id")
            const card = button.closest(".admin-request-card")
            const badge = card.querySelector(".badge")

            badge.className = "badge badge-approved"
            badge.textContent = "Approved"
            card.setAttribute("data-status", "approved")

            button.disabled = true
            card.querySelector(".btn-deny").disabled = true

            showNotification(`Request #${requestId} has been approved`, "success")

            console.log(`Approved request ${requestId}`)
        })
    })

    const denyButtons = document.querySelectorAll(".btn-deny")
    denyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const requestId = button.getAttribute("data-id")
            const card = button.closest(".admin-request-card")
            const badge = card.querySelector(".badge")

            badge.className = "badge badge-denied"
            badge.textContent = "Denied"
            card.setAttribute("data-status", "denied")

            button.disabled = true
            card.querySelector(".btn-approve").disabled = true

            showNotification(`Request #${requestId} has been denied`, "error")

            console.log(`Denied request ${requestId}`)
        })
    })

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

    function showNotification(message, type) {

        const notification = document.createElement("div")
        notification.className = `notification notification-${type}`

        const icon = document.createElement("i")
        icon.setAttribute("data-lucide", type === "success" ? "check-circle" : "alert-circle")

        const messageElement = document.createElement("span")
        messageElement.textContent = message


        notification.appendChild(icon)
        notification.appendChild(messageElement)

        document.body.appendChild(notification)

        lucide.createIcons({
            icons: {
                [icon.getAttribute("data-lucide")]: icon,
            },
        })

        setTimeout(() => {
            notification.classList.add("show")
        }, 10)

        setTimeout(() => {
            notification.classList.remove("show")
            setTimeout(() => {
                notification.remove()
            }, 300)
        }, 3000)
    }

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

            showNotification("Loading page data...", "success")
        })
    })
})
