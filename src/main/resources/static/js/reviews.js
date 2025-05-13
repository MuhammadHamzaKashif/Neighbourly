document.addEventListener("DOMContentLoaded", async () => {
    // Initialize Lucide icons
    const lucide = window.lucide;
    lucide.createIcons();

    // Fetch and populate tasks when page loads
    await populateTaskDropdown();

    // Task selection logic
    const taskSelect = document.getElementById("task-id");
    const revieweeInput = document.getElementById("reviewee-username");
    const reviewerInput = document.getElementById("reviewer-username");
    if (taskSelect && revieweeInput) {
        taskSelect.addEventListener("change", function () {
            const selectedOption = this.options[this.selectedIndex];
            const volunteerUsername = selectedOption.getAttribute('data-volunteer') || "";
            revieweeInput.textContent = volunteerUsername;
            revieweeInput.value = selectedOption.getAttribute('data-volunteer-id')
        });
    }
    const user = await getUser();

    reviewerInput.textContent = user.username;
    reviewerInput.value = user.id;















    async function getVolunteerById(id) {
        try {
            console.log("VolunteerId: ", id);
            const response = await fetch(`/api/task/${id}/volunteer`, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const username = await response.json();
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













    async function populateTaskDropdown() {
        try {
            const response = await fetch('/api/myTasks', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const tasks = await response.json();
                const taskSelect = document.getElementById("task-id");

                // Clear existing options except the first one
                while (taskSelect.options.length > 1) {
                    taskSelect.remove(1);
                }

                // Add new options for each task
                tasks.forEach(async task => {
                    const volunteer = await getVolunteerById(task.id);
                    if (task.status === 'Completed') { // Only show completed tasks
                        const option = document.createElement('option');
                        option.value = task.id;
                        option.textContent = `Task #${task.id} - ${task.title} (${volunteer.username})`;

                        // Store volunteer username in data attribute
                        if (volunteer) {
                            option.setAttribute('data-volunteer', volunteer.username);
                            option.setAttribute('data-volunteer-id', volunteer.id);
                            //revieweeInput.value = volunteer.id;
                        }


                        taskSelect.appendChild(option);
                    }
                });

                // Also fetch volunteered tasks if needed
                //await populateVolunteeredTasks();
            } else {
                console.error('Failed to fetch tasks');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }



    async function getUser() {
        try {
            const response = await fetch('/api/user', {
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                const user = await response.json();
                return user;
            }
            else {
                console.error("Couldnt get user");
                return null;
            }
        }
        catch (error) {
            console.error("Failure in getting user id", error);
            return null;
        }
    }










    //alert(".......")
    // Star rating functionality

    //alert("NNNNNNNNNNN")
    // Handle click events
    // Star rating functionality
    const starLabels = document.querySelectorAll(".star-rating label");

    if (starLabels.length > 0) {
        // Wait for Lucide icons to be created
        setTimeout(() => {
            // Add hover effect
            starLabels.forEach((label) => {
                const icon = label.querySelector("i");
                if (!icon) return; // Skip if no icon found

                label.addEventListener("mouseenter", function () {
                    const currentStar = this.getAttribute("for").replace("star", "");

                    starLabels.forEach((innerLabel) => {
                        const innerIcon = innerLabel.querySelector("i");
                        if (!innerIcon) return;

                        const innerStar = innerLabel.getAttribute("for").replace("star", "");
                        if (innerStar <= currentStar) {
                            innerIcon.classList.add("star-hover");
                        } else {
                            innerIcon.classList.remove("star-hover");
                        }
                    });
                });

                label.addEventListener("mouseleave", () => {
                    starLabels.forEach((innerLabel) => {
                        const innerIcon = innerLabel.querySelector("i");
                        if (innerIcon) innerIcon.classList.remove("star-hover");
                    });
                });
            });

            // Handle click events
            const starInputs = document.querySelectorAll(".star-rating input");
            starInputs.forEach((input) => {
                input.addEventListener("change", function () {
                    const rating = this.value;

                    starLabels.forEach((label) => {
                        const icon = label.querySelector("i");
                        if (!icon) return;

                        const star = label.getAttribute("for").replace("star", "");
                        if (star <= rating) {
                            icon.classList.add("star-selected");
                        } else {
                            icon.classList.remove("star-selected");
                        }
                    });
                });
            });
        }, 100); // Small delay to ensure icons are created
    }

    console.log('Star labels:', starLabels);
    starLabels.forEach(label => {
        console.log('Label:', label, 'Icon:', label.querySelector("i"));
    });
    //alert("MMMMMMMM")
    // Form validation
    const reviewForm = document.getElementById("review-form")
    if (reviewForm) {
        reviewForm.addEventListener("submit", async (e) => {
            e.preventDefault()
            let isValid = true

            // Validate task selection
            const taskId = document.getElementById("task-id")
            if (!taskId.value) {
                isValid = false
                taskId.classList.add("input-error")
            } else {
                taskId.classList.remove("input-error")
            }

            // Validate rating
            const ratingInputs = document.querySelectorAll('input[name="rating"]')
            const ratingError = document.getElementById("rating-error")
            let ratingSelected = false
            let ratingVal = 0;
            ratingInputs.forEach((input) => {
                if (input.checked) {
                    ratingVal += input.value;
                    ratingSelected = true;
                }
            });


            if (!ratingSelected) {
                isValid = false
                ratingError.textContent = "Please select a rating"
            } else {
                ratingError.textContent = ""
            }

            // Validate comment
            const comment = document.getElementById("review-comment")
            const commentError = document.getElementById("comment-error")

            if (!comment.value.trim()) {
                isValid = false
                commentError.textContent = "Please provide a review comment"
                comment.classList.add("input-error")
            } else if (comment.value.trim().length < 10) {
                isValid = false
                commentError.textContent = "Your review must be at least 10 characters long"
                comment.classList.add("input-error")
            } else {
                commentError.textContent = ""
                comment.classList.remove("input-error")
            }

            if (isValid) {
                const review = {
                    created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    description: comment.value,
                    rating: ratingVal,
                    reviewee_id: revieweeInput.value,
                    reviewer_id: reviewerInput.value,
                    task_id: taskId.value

                }
                const response = await fetch(`/api/review/${taskId.value}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(review)
                })
                if (response.ok) {
                    alert("Review submitted successfully!")
                    reviewForm.reset()
                    starLabels.forEach((label) => {
                        const icon = label.querySelector("i")
                        icon.classList.remove("star-selected")
                    })
                }
                else {
                    alert("Error while submitting")
                }

                // Simulate form submission

                // Reset star ratings visual state

            }
        })
    }
})
