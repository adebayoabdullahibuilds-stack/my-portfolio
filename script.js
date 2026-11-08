const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const currentYear = document.querySelector("#current-year");
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

const projectColors = {
  viara: {
    primary: "#25245B",
    label: "#25245B",
    accent: "#7165D9",
    soft: "#E9E6FF",
  },
  dwellsafe: {
    primary: "#174C3A",
    label: "#174C3A",
    accent: "#58A783",
    soft: "#E5F1EA",
  },
  opon: {
    primary: "#A65A2E",
    label: "#9E562C",
    accent: "#D99A55",
    soft: "#F7EBDD",
  },
};

document.querySelectorAll("[data-project-color]").forEach((card) => {
  const colors = projectColors[card.dataset.projectColor];

  if (!colors) {
    console.error(
      `No project color configuration found for "${card.dataset.projectColor}".`
    );
    return;
  }

  card.style.setProperty("--project-primary", colors.primary);
  card.style.setProperty("--project-label", colors.label);
  card.style.setProperty("--project-accent", colors.accent);
  card.style.setProperty("--project-soft", colors.soft);
});

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";

  if (themeToggle) {
    const themeIcon = themeToggle.querySelector(".theme-toggle-icon");
    const themeLabel = themeToggle.querySelector(".theme-toggle-label");

    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${isDark ? "light" : "dark"} theme`
    );

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }

    if (themeLabel) {
      themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
    }
  }

  if (themeColor) {
    themeColor.setAttribute("content", isDark ? "#171a18" : "#f5f3ed");
  }
}

function getPreferredTheme() {
  try {
    const preference = localStorage.getItem("portfolio-theme");
    if (preference === "dark" || preference === "light") {
      return preference;
    }
  } catch (error) {
    console.warn("Theme preference could not be read from local storage.", error);
  }

  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

const savedTheme = getPreferredTheme();

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
