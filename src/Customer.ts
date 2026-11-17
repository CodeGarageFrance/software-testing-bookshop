const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Customer {
  readonly email: string;

  constructor(email: string) {
    if (!Customer.isValidEmail(email)) {
      throw new Error(`Invalid email: ${email}`);
    }
    this.email = email.trim().toLowerCase();
  }

  static isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email.trim());
  }
}
