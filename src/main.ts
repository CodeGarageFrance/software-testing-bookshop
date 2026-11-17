import { Book } from './Book';
import { Cart } from './Cart';
import { Customer } from './Customer';
import { StorageService } from './StorageService';

const storage = new StorageService('./data');
const email = 'alice@example.com';

// Load the saved cart, or start a new one.
const cart = (await storage.loadCart(email)) ?? new Cart(new Customer(email));

cart.add(new Book('9780132350884', 'Clean Code', 'Robert C. Martin', 34.9));
await storage.saveCart(cart);

console.log(`Cart of ${cart.customer.email} (saved in ./data)`);
for (const { book, quantity } of cart.getItems()) {
  console.log(` - ${quantity} x ${book.title} (${book.price} €)`);
}
console.log(`Total: ${cart.total()} € for ${cart.itemCount()} books`);
console.log('Run `npm start` again: the cart keeps growing, because it is reloaded from disk.');
