# 📚 Bookshop — a playground for learning software testing

A tiny bookshop in **TypeScript** (OOP), used as support material to learn software testing.
Carts are saved as JSON files (no database).

## Getting started

```bash
npm install
npm start                 # runs a small demo (src/main.ts): carts are saved in ./data
npm test                  # runs all tests (Vitest, same API as Jest)
npm run test:unit         # unit tests only
npm run test:integration  # integration tests only (real file system)
npm run test:watch        # re-runs tests on every change
npm run test:coverage     # coverage report
```

## Code

| File | What it does |
|---|---|
| [src/Book.ts](src/Book.ts) | A book: ISBN, title, author, price. ISBN and title are required, and the price must be > 0. |
| [src/Customer.ts](src/Customer.ts) | A customer, identified by an email address. The email is validated and stored in lowercase. |
| [src/Cart.ts](src/Cart.ts) | A customer's cart: add (merges duplicates), remove, item count, total, clear. |
| [src/StorageService.ts](src/StorageService.ts) | Saves, loads and deletes carts as JSON files (one file per customer). The folder is passed in through the constructor. |

## Tests

```
tests/
├── unit/          # one class at a time, in memory
└── integration/   # several real classes + the real file system
```

[tests/integration/StorageService.test.ts](tests/integration/StorageService.test.ts) runs `StorageService`, `Cart`, `Book` and `Customer` together against real files. Each test:

1. creates its own **empty temporary folder** (`beforeEach`),
2. saves and loads carts in it,
3. **deletes the folder** afterwards (`afterEach`).

This keeps the tests independent: no test depends on files left behind by another one or by `npm start`.
