document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("nav-dark-link");
    const icon = document.getElementById("nav-dark-icon");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun"); // Show sun icon when dark mode is active
    }

    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun"); // Change icon to sun in dark mode
        } else {
            localStorage.setItem("theme", "light");
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon"); // Change icon back to moon in light mode
        }
    });
});
