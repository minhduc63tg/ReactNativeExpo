export type Id = number;

export interface User {
  id: Id;
  name: string;
  email: string;
}

export interface Book {
  id: Id;
  title: string;
  author: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface Review {
  id: Id;
  bookId: Id;
  userId: Id;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
