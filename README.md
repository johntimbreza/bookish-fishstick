# Calculator

A clean, extensible web calculator demonstrating separation of concerns and modular architecture.

## Quick Start

**Option 1:** Using Node.js

```bash
npm start
# or: node server.js
```

**Option 2:** Using npx serve

```bash
npx serve .
```

Then open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
bookish-fishstick/
├── index.html          # App layout and button grid
├── css/
│   └── style.css       # Visual styling and layout
├── js/
│   ├── calculator.js   # Pure calculation logic (no DOM)
│   └── ui.js           # DOM bindings and event handlers
└── server.js           # Minimal static file server
```

## Architecture

The calculator.js module is pure logic with a clean API—it knows nothing about the DOM. The ui.js module only handles DOM bindings and event handlers. This separation of concerns makes the app easy to extend, test, and maintain.

## Extending the App

- **History log** — Add a panel showing recent calculations
- **Memory functions** — Implement M+, M-, MR, MC buttons
- **Keyboard support** — Map keys to calculator buttons
- **Scientific mode** — Add sin, cos, sqrt, power functions

Each extension can be added without modifying the other files.

## Demo Notes

This project was built using **GitHub Copilot agent orchestration**:

- Parallel tasks handled scaffolding, HTML structure, and CSS styling simultaneously
- Sequential tasks implemented the calculation logic layer after the UI foundation was established
- Demonstrates how configurable agents can coordinate complex workflows while maintaining clean separation of concerns
