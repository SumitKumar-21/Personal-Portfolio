const deleteForms = document.querySelectorAll(".delete-form");

deleteForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
        const confirmed = confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            event.preventDefault();
        }
    });
});


const updateForms = document.querySelectorAll(".update-form");

updateForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
        const confirmed = confirm(
            "Are you sure you want to update this project?"
        );

        if (!confirmed) {
            event.preventDefault();
        }
    });
});


const cancelButtons = document.querySelectorAll(".cancel-btn");

cancelButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const confirmed = confirm(
            "Are you sure you want to cancel? Unsaved changes will be lost."
        );

        if (confirmed) {
            window.history.back();
        }
    });
});