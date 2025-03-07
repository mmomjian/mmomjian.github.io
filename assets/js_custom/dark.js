document.addEventListener("DOMContentLoaded", function () {

    const toggleButton = document.getElementById("nav-dark-link");
    const icon = document.getElementById("nav-dark-icon");
    const currentTheme = localStorage.getItem("theme");
    const text = document.getElementById("nav-dark-text");

    function makeDark () {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun"); // Show sun icon when dark mode is active
        text.innerHTML = "Light mode";
 return; }

    function makeLight () {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon"); // Show moon icon when light mode is active
        text.innerHTML = "Dark mode";
 return; }

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        makeDark();
    } else {
        makeLight();
    }

    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            makeDark();
        } else {
            localStorage.setItem("theme", "light");
            makeLight();
        }
    });
});
