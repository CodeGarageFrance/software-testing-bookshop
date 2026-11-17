import { Book } from './Book';
import { Cart } from './Cart';
import { Customer } from './Customer';

const customer = new Customer('alice@example.com');
const cart = new Cart(customer);

cart.add(new Book('9780132350884', 'Clean Code', 'Robert C. Martin', 34.9), 2);
cart.add(new Book('9782070368228', 'Le Petit Prince', 'Antoine de Saint-Exupéry', 7.5));

console.log(`Cart of ${cart.customer.email}`);
for (const { book, quantity } of cart.getItems()) {
  console.log(` - ${quantity} x ${book.title} (${book.price} €)`);
}
console.log(`Total: ${cart.total()} € for ${cart.itemCount()} books`);
