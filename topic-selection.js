const courses = document.querySelectorAll(".single-course");
const dropdownOptions = document.querySelectorAll(".dropdown-options")
const sections = document.querySelectorAll(".section")
const generalCheckbox = document.querySelectorAll('input[type="checkbox"]');
const dropdownSelected = document.querySelectorAll(".dropdown-selected");


courses.forEach(course => {

    course.addEventListener("click", (event) => {
        const selectedDropdown = event.target.closest(".dropdown-selected");
        if (selectedDropdown) {
            const dropdownOptions = selectedDropdown.nextElementSibling;

            document.querySelectorAll(".dropdown-options").forEach(options => {
                if (options !== dropdownOptions) {
                    options.classList.remove("active");
                }
            });

            dropdownOptions.classList.toggle("active");
        } else {
            dropdownOptions.forEach(options => {
                options.classList.remove("active");
            });
        }
    });
});




    let activeSection = null; // Keeps track of the section where generalCheckbox are selected

    sections.forEach(section => {
        const checkboxes = section.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", (event) => {
                const checkedBoxes = section.querySelectorAll('input[type="checkbox"]:checked');

                if (activeSection && activeSection !== section) {
                    showWarning(section, "You can only select courses in one semester at a time.");
                    event.target.checked = false;
                    return;
                }

                if (checkedBoxes.length > 3) {
                    showWarning(section, "You can only select up to 3 courses per section.");
                    event.target.checked = false;
                    return;
                }

                if (checkedBoxes.length > 0) {
                    activeSection = section;
                } else {
                    activeSection = null; // Reset if no checkboxes are checked
                }
            });
        });
    });

    function showWarning(section, message) {
        const existingWarning = section.querySelector(".warning-message");
        if (existingWarning) {
            existingWarning.remove();
        }

        const warning = document.createElement("div");
        warning.classList.add("warning-message");
        warning.innerText = message;

        
        section.prepend(warning);

        setTimeout(() => {
            warning.remove();
        }, 3000);
    }


    generalCheckbox.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const parentDiv = this.closest(".single-course");
            const courseBody = parentDiv.querySelector(".course-body");

            if (this.checked) {
                courseBody.style.display = "block";
                courseBody.style.height ="auto" 
            } else {
                courseBody.style.display = "none";
            }
        });
    });

    

    courses.forEach(course => {
        const dropdownSelectedList = course.querySelectorAll(".dropdown-selected");
        const dropdownOptionsList = course.querySelectorAll(".dropdown-options");

        dropdownSelectedList.forEach((dropdownSelected, index) => {
            const dropdownOptions = dropdownOptionsList[index]; // Get corresponding options

            // Toggle dropdown visibility
            dropdownSelected.addEventListener("click", function (event) {
                event.stopPropagation();
                dropdownOptions.style.display = dropdownOptions.style.display === "block" ? "none" : "block";
            });

            // Handle option selection
            dropdownOptions.querySelectorAll("div").forEach(option => {
                option.addEventListener("click", function () {
                    let selectedText = option.dataset.value;

                    // Limit text to 10 characters and add ellipsis if needed
                    if (selectedText.length > 10) {
                        selectedText = selectedText.substring(0, 17) + "...";
                    }

                    dropdownSelected.textContent = selectedText;
                    dropdownOptions.style.display = "none"; // Hide dropdown after selection
                });
            });
        });

        // Close dropdown if clicked outside
        document.addEventListener("click", function (event) {
            dropdownOptionsList.forEach(dropdownOptions => {
                if (!course.contains(event.target)) {
                    dropdownOptions.style.display = "none";
                }
            });
        });
    });

    