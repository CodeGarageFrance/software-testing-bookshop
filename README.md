# 📚 Bookshop — a playground for learning software testing

A tiny bookshop in **TypeScript** (OOP), used as support material to learn software testing.
No database: everything lives in memory.

## Getting started

```bash
npm install
npm start               # runs a small demo (src/main.ts)
npm test                # runs the tests (Vitest, same API as Jest)
npm run test:watch      # re-runs tests on every change
npm run test:coverage   # coverage report
```

## Code

| File | What it does |
|---|---|
| [src/Book.ts](src/Book.ts) | A book: ISBN, title, author, price. ISBN and title are required, and the price must be > 0. |
| [src/Customer.ts](src/Customer.ts) | A customer, identified by an email address. The email is validated and stored in lowercase. |
| [src/Cart.ts](src/Cart.ts) | A customer's cart: add (merges duplicates), remove, item count, total, clear. |

## Tests

[tests/Customer.test.ts](tests/Customer.test.ts) is an example to start from.
