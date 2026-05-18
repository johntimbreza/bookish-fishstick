// DOM bindings only. To add a new feature: add a method to calculator.js,
// add a button to index.html with a data-attribute, handle it here.

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const calculatorEl = document.querySelector(".calculator");

  function updateDisplay() {
    display.textContent = window.calculator.getDisplay();
  }

  // Single delegated listener on .calculator catches both standard and scientific buttons
  calculatorEl.addEventListener("click", (event) => {
    // Use closest() so clicks on child elements (e.g. SVG) still resolve to the button
    const target = event.target.closest("button");
    if (!target) return;

    const number = target.dataset.number;
    const operator = target.dataset.operator;
    const action = target.dataset.action;
    const scientific = target.dataset.scientific;
    const constant = target.dataset.constant;

    if (number !== undefined) {
      if (number === ".") {
        window.calculator.inputDecimal();
      } else {
        window.calculator.inputNumber(number);
      }
    } else if (operator !== undefined) {
      window.calculator.inputOperator(operator);
    } else if (scientific !== undefined) {
      // Unary scientific function (sin, sqrt, log, etc.)
      window.calculator.inputScientific(scientific);
    } else if (constant !== undefined) {
      // Mathematical constant (pi, e)
      window.calculator.inputConstant(constant);
    } else if (action === "clear") {
      window.calculator.inputClear();
    } else if (action === "equals") {
      window.calculator.inputEquals();
    } else if (action === "negate") {
      window.calculator.inputNegate();
    } else if (action === "percent") {
      window.calculator.inputPercent();
    } else if (action === "toggleSci") {
      // Show/hide the scientific panel
      const panel = document.getElementById("sci-panel");
      const sciToggle = document.getElementById("sci-toggle");
      const isOpen = sciToggle.getAttribute("aria-expanded") === "true";
      panel.hidden = isOpen;
      sciToggle.setAttribute("aria-expanded", String(!isOpen));
      sciToggle.classList.toggle("btn-mode-active", !isOpen);
      return; // No display update needed
    } else if (action === "toggleAngle") {
      // Toggle DEG / RAD mode
      const angleToggle = document.getElementById("angle-toggle");
      const newMode = window.calculator.setAngleMode();
      const isDeg = newMode === "deg";
      angleToggle.textContent = isDeg ? "DEG" : "RAD";
      angleToggle.setAttribute(
        "aria-label",
        isDeg
          ? "Angle mode: Degrees — click to switch to Radians"
          : "Angle mode: Radians — click to switch to Degrees",
      );
      angleToggle.classList.toggle("btn-angle-active", isDeg);
      return; // No display update needed
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
