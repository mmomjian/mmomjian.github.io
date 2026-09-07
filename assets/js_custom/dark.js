(function () {

    const toggleButton = document.getElementById("nav-dark-link");
    const icon = document.getElementById("nav-dark-icon");
    const currentTheme = localStorage.getItem("theme");
    const text = document.getElementById("nav-dark-text");

    // Icon and text both show the theme that is currently active; the
    // accessible label and tooltip describe what a click will do.
    function makeDark () {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        text.innerHTML = "Dark mode";
        toggleButton.setAttribute("aria-label", "Switch to light mode");
        toggleButton.setAttribute("title", "Switch to light mode");
 return; }

    function makeLight () {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        text.innerHTML = "Light mode";
        toggleButton.setAttribute("aria-label", "Switch to dark mode");
        toggleButton.setAttribute("title", "Switch to dark mode");
 return; }

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        makeDark();
    } else {
        makeLight();
    }

    toggleButton.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            makeDark();
        } else {
            localStorage.setItem("theme", "light");
            makeLight();
        }
    });
})();
