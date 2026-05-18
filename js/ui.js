// DOM bindings only. To add a new feature: add a method to calculator.js,
// add a button to index.html with a data-attribute, handle it here.

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttonsContainer = document.querySelector(".buttons");

  function updateDisplay() {
    display.textContent = window.calculator.getDisplay();
  }

  buttonsContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.classList.contains("btn")) return;

    const number = target.dataset.number;
    const operator = target.dataset.operator;
    const action = target.dataset.action;

    if (number !== undefined) {
      if (number === ".") {
        window.calculator.inputDecimal();
      } else {
        window.calculator.inputNumber(number);
      }
    } else if (operator !== undefined) {
      window.calculator.inputOperator(operator);
    } else if (action === "clear") {
      window.calculator.inputClear();
    } else if (action === "equals") {
      window.calculator.inputEquals();
    } else if (action === "negate") {
      window.calculator.inputNegate();
    } else if (action === "percent") {
      window.calculator.inputPercent();
    }

    updateDisplay();
  });

  // --- Theme toggle ---
  const themeToggle = document.getElementById("theme-toggle");

  const themes = ["dark", "light", "pink"];
  const themeConfig = {
    dark: { text: "🌙 Dark", label: "Switch to light mode", classes: [] },
    light: {
      text: "☀️ Light",
      label: "Switch to pink mode",
      classes: ["light-mode"],
    },
    pink: {
      text: "🩷 Pink",
      label: "Switch to dark mode",
      classes: ["pink-mode"],
    },
  };

  function applyTheme(theme) {
    document.body.classList.remove("light-mode", "pink-mode");
    themeConfig[theme].classes.forEach((cls) =>
      document.body.classList.add(cls),
    );
    themeToggle.textContent = themeConfig[theme].text;
    themeToggle.setAttribute("aria-label", themeConfig[theme].label);
    localStorage.setItem("calculator-theme", theme);
  }

  themeToggle.addEventListener("click", () => {
    const current = localStorage.getItem("calculator-theme") || "dark";
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    applyTheme(next);
  });

  // Restore saved theme on load
  applyTheme(localStorage.getItem("calculator-theme") || "dark");
  // --- End theme toggle ---

  // Initialize display
  updateDisplay();
});
