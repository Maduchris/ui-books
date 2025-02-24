export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: string;
  rating: number;
  publicationDate: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  bookId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface FilterState {
  genre: string;
  author: string;
  searchQuery: string;
  sortBy: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}
