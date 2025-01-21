
document.addEventListener("DOMContentLoaded", function() {
    const dropdownButtons = document.querySelectorAll(".dropdown-btn");

    dropdownButtons.forEach(button => {
        button.addEventListener("click", function() {
            const dropdownContent = this.nextElementSibling;
            const arrow = this.querySelector(".arrow");

            // Toggle the active class and display
            this.classList.toggle("active");
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";

            // Rotate arrow
            arrow.style.transform = dropdownContent.style.display === "block" ? "rotate(180deg)" : "rotate(0deg)";
        });
    });
});
