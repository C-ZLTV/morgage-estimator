# Mortgage Estimator

A small mortgage calculator built with React and TypeScript.

## Features

- Calculate the estimated installment using the loan amount, interest
  rate, duration and number of yearly installments.
- Choose between a fixed or variable rate.
- View the estimated installment and, for variable rates, the next
  five installments.
- Save previous calculations in the browser using LocalStorage.
- View the calculation history.

**Note:** Variable rates are examples for illustration only. They are
not based on live market data.

## Built with

- React
- TypeScript
- Vite
- CSS
- Vitest and React Testing Library

## Getting started

Clone the project, install the dependencies and start the development
server:

```bash
npm install
npm run dev
```

## Available scripts

Command Description

---

`npm run dev` Start the development server
`npm run build` Check TypeScript and create a production build
`npm run preview` Preview the production build
`npm run lint` Run ESLint
`npm run test` Run tests in watch mode
`npm run test:run` Run all tests once

## Tests

The test suite covers:

- Mortgage calculations, including a zero interest rate.
- Saving and reading calculation history.
- Form validation and submission.
- Fixed and variable rate results.
- Empty and populated history states.

Run all tests with:

```bash
npm run test:run
```
