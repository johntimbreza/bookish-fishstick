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

  // Initialize display
  updateDisplay();
});
