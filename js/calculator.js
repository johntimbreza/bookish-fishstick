/**
 * Pure calculator logic. No DOM. Easy to extend: add methods here, wire them up in ui.js
 *
 * Uses IIFE module pattern to expose a global calculator object with methods
 * for input handling and display state management.
 */

window.calculator = (function () {
  // Private state
  let currentInput = "0";
  let previousInput = null;
  let operator = null;
  let waitingForSecondOperand = false;

  /**
   * Appends a digit to the current input
   * @param {string} digit - The digit to append (0-9)
   */
  function inputNumber(digit) {
    // If displaying error, clear first
    if (currentInput === "Error") {
      inputClear();
    }

    // If waiting for second operand, reset input to new digit
    if (waitingForSecondOperand) {
      currentInput = String(digit);
      waitingForSecondOperand = false;
      return;
    }

    // Prevent multiple leading zeros
    if (currentInput === "0") {
      currentInput = String(digit);
    } else {
      currentInput += String(digit);
    }
  }

  /**
   * Adds a decimal point to current input if not already present
   */
  function inputDecimal() {
    // If displaying error, clear first
    if (currentInput === "Error") {
      inputClear();
    }

    // If waiting for second operand, start with "0."
    if (waitingForSecondOperand) {
      currentInput = "0.";
      waitingForSecondOperand = false;
      return;
    }

    // Only add decimal if not already present
    if (!currentInput.includes(".")) {
      currentInput += ".";
    }
  }

  /**
   * Records an operator and handles operator chaining
   * @param {string} op - The operator (+, -, *, /)
   */
  function inputOperator(op) {
    // If displaying error, clear first
    if (currentInput === "Error") {
      inputClear();
    }

    const inputValue = parseFloat(currentInput);

    // If there's a pending operator and we're not waiting, calculate first (chaining)
    if (operator !== null && !waitingForSecondOperand) {
      const result = calculate(previousInput, inputValue, operator);
      currentInput = String(result);
      previousInput = result;
    } else {
      previousInput = inputValue;
    }

    operator = op;
    waitingForSecondOperand = true;
  }

  /**
   * Performs the pending calculation
   */
  function inputEquals() {
    const inputValue = parseFloat(currentInput);

    // If no operator, nothing to calculate
    if (operator === null) {
      return;
    }

    const result = calculate(previousInput, inputValue, operator);
    currentInput = String(result);

    // Reset operator state
    operator = null;
    previousInput = null;
    waitingForSecondOperand = false;
  }

  /**
   * Performs the actual calculation
   * @param {number} first - First operand
   * @param {number} second - Second operand
   * @param {string} op - Operator (+, -, *, /)
   * @returns {number|string} Result or "Error"
   */
  function calculate(first, second, op) {
    let result;

    switch (op) {
      case "+":
        result = first + second;
        break;
      case "-":
        result = first - second;
        break;
      case "*":
        result = first * second;
        break;
      case "/":
        // Handle division by zero
        if (second === 0) {
          return "Error";
        }
        result = first / second;
        break;
      default:
        return second;
    }

    // Use toPrecision to handle floating point precision issues (e.g., 0.1 + 0.2)
    return parseFloat(result.toPrecision(10));
  }

  /**
   * Resets all calculator state to initial values
   */
  function inputClear() {
    currentInput = "0";
    previousInput = null;
    operator = null;
    waitingForSecondOperand = false;
  }

  /**
   * Flips the sign of the current input (positive ↔ negative)
   */
  function inputNegate() {
    // If displaying error, ignore
    if (currentInput === "Error") {
      return;
    }

    // If zero, no-op
    if (currentInput === "0") {
      return;
    }

    // Toggle negative sign
    if (currentInput.startsWith("-")) {
      currentInput = currentInput.slice(1);
    } else {
      currentInput = "-" + currentInput;
    }
  }

  /**
   * Converts current input to percentage (divides by 100)
   */
  function inputPercent() {
    // If displaying error, ignore
    if (currentInput === "Error") {
      return;
    }

    const value = parseFloat(currentInput);
    const result = value / 100;

    // Use toPrecision for clean output
    currentInput = String(parseFloat(result.toPrecision(10)));
  }

  /**
   * Returns the current display value
   * @returns {string} The string to display in the UI
   */
  function getDisplay() {
    return currentInput || "0";
  }

  // Public API
  return {
    inputNumber,
    inputDecimal,
    inputOperator,
    inputEquals,
    inputClear,
    inputNegate,
    inputPercent,
    getDisplay,
  };
})();
