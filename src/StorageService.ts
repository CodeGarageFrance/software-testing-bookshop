import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Book } from './Book';
import { Cart } from './Cart';
import { Customer } from './Customer';

/** The shape of a cart once written to disk (plain JSON, no classes). */
interface CartData {
  email: string;
  items: { isbn: string; title: string; author: string; price: number; quantity: number }[];
}

/**
 * Saves carts as JSON files, one file per customer, in the given directory.
 * Example: <directory>/alice%40example.com.json
 */
export class StorageService {
  constructor(private readonly directory: string) {}

  async saveCart(cart: Cart): Promise<void> {
    const data: CartData = {
      email: cart.customer.email,
      items: cart.getItems().map(({ book, quantity }) => ({
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        price: book.price,
        quantity,
      })),
    };
    await mkdir(this.directory, { recursive: true });
    await writeFile(this.filePath(cart.customer.email), JSON.stringify(data, null, 2), 'utf-8');
  }

  /** Returns the saved cart, or null if this customer has no saved cart. */
  async loadCart(email: string): Promise<Cart | null> {
    let content: string;
    try {
      content = await readFile(this.filePath(email), 'utf-8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw error;
    }

    const data: CartData = JSON.parse(content);
    const cart = new Cart(new Customer(data.email));
    for (const item of data.items) {
      cart.add(new Book(item.isbn, item.title, item.author, item.price), item.quantity);
    }
    return cart;
  }

  async deleteCart(email: string): Promise<void> {
    await rm(this.filePath(email), { force: true });
  }

  private filePath(email: string): string {
    // Emails are lowercased by Customer, so do the same here to always hit the same file.
    // encodeURIComponent turns "@" and "/" into safe characters for a file name.
    return join(this.directory, `${encodeURIComponent(email.trim().toLowerCase())}.json`);
  }
}
