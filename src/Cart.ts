import { Book } from './Book';
import { Customer } from './Customer';

export interface CartItem {
  book: Book;
  quantity: number;
}

export class Cart {
  private items: CartItem[] = [];

  constructor(readonly customer: Customer) {}

  add(book: Book, quantity = 1): void {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Quantity must be a positive integer');
    }
    const existing = this.items.find((item) => item.book.isbn === book.isbn);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ book, quantity });
    }
  }

  remove(isbn: string): void {
    this.items = this.items.filter((item) => item.book.isbn !== isbn);
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  total(): number {
    const total = this.items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
    return Math.round(total * 100) / 100;
  }

  clear(): void {
    this.items = [];
  }
}
