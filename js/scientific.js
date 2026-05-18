/**
 * Scientific math functions. Pure math — no DOM, no state.
 * To add a new function: add one entry to the `functions` map above.
 * All functions follow the signature: (value, angleMode) => number | null
 * null means the input is invalid (will be displayed as "Error").
 */

window.sciMath = (function () {
  "use strict";

  // Private helper functions
  function toRad(deg) {
    return (deg * Math.PI) / 180;
  }

  function toDeg(rad) {
    return (rad * 180) / Math.PI;
  }

  // Returns integer factorial or null if invalid
  function factorial(n) {
    if (!Number.isInteger(n) || n < 0 || n > 170) return null;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }

  // Private functions map — each entry is (value, angleMode) => number | null
  const functions = {
    // Trigonometry — converts degrees to radians when angleMode === 'deg'
    sin: (x, m) => Math.sin(m === "deg" ? toRad(x) : x),
    cos: (x, m) => Math.cos(m === "deg" ? toRad(x) : x),
    // tan(90°) approaches infinity — treat |result| > 1e10 as Error
    tan: (x, m) => {
      const r = Math.tan(m === "deg" ? toRad(x) : x);
      return Math.abs(r) > 1e10 ? null : r;
    },

    // Inverse trig — input is a plain number; result converted to degrees if angleMode === 'deg'
    asin: (x, m) =>
      x < -1 || x > 1 ? null : m === "deg" ? toDeg(Math.asin(x)) : Math.asin(x),
    acos: (x, m) =>
      x < -1 || x > 1 ? null : m === "deg" ? toDeg(Math.acos(x)) : Math.acos(x),
    atan: (x, m) => (m === "deg" ? toDeg(Math.atan(x)) : Math.atan(x)),

    // Powers and roots
    square: (x) => x * x,
    sqrt: (x) => (x < 0 ? null : Math.sqrt(x)),
    cbrt: (x) => Math.cbrt(x),
    reciprocal: (x) => (x === 0 ? null : 1 / x),

    // Logarithms
    log: (x) => (x <= 0 ? null : Math.log10(x)),
    ln: (x) => (x <= 0 ? null : Math.log(x)),

    // Exponentials
    exp: (x) => Math.exp(x),
    pow10: (x) => Math.pow(10, x),

    // Other
    factorial: (x) => factorial(x),
    abs: (x) => Math.abs(x),
  };

  // Public API
  return {
    /**
     * Computes a scientific function on a value.
     * @param {string} fn - Function name key (e.g. "sin", "sqrt")
     * @param {number} value - The operand
     * @param {string} angleMode - "deg" or "rad"
     * @returns {number|string} Numeric result, or "Error" on invalid input
     */
    compute(fn, value, angleMode) {
      const impl = functions[fn];
      if (!impl) return "Error";
      const result = impl(value, angleMode);
      if (result === null || !isFinite(result) || isNaN(result)) return "Error";
      return parseFloat(result.toPrecision(10));
    },
  };
})();
