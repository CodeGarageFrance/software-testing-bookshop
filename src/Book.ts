export class Book {
  constructor(
    readonly isbn: string,
    readonly title: string,
    readonly author: string,
    readonly price: number,
  ) {
    if (isbn.trim() === '') throw new Error('ISBN is required');
    if (title.trim() === '') throw new Error('Title is required');
    if (price <= 0) throw new Error('Price must be greater than 0');
  }
}
