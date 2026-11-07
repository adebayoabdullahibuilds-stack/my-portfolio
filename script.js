const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const currentYear = document.querySelector("#current-year");
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${isDark ? "light" : "dark"} theme`
    );
    themeToggle.querySelector(".theme-toggle-icon").textContent = isDark ? "☀" : "☾";
    themeToggle.querySelector(".theme-toggle-label").textContent =
      isDark ? "Light mode" : "Dark mode";
  }

  if (themeColor) {
    themeColor.setAttribute("content", isDark ? "#171a18" : "#f5f3ed");
  }
}

let savedTheme = "light";

try {
  const preference = localStorage.getItem("portfolio-theme");
  if (preference === "dark" || preference === "light") {
    savedTheme = preference;
  }
} catch (error) {
  console.warn("Theme preference could not be read from local storage.", error);
}

applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);

    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
      console.warn("Theme preference could not be saved to local storage.", error);
    }
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    primaryNav.classList.toggle("is-open", !isExpanded);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
    }
  });
}
