import { describe, expect, it } from 'vitest';
import { Customer } from '../src/Customer';

// Example test file
describe('Customer', () => {
  it('accepts a valid email', () => {
    const customer = new Customer('alice@example.com');

    expect(customer.email).toBe('alice@example.com');
  });

  it('throws on an invalid email', () => {
    expect(() => new Customer('not-an-email')).toThrow('Invalid email');
  });
});
