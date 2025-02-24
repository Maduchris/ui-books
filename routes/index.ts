export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  description: string;
  coverImage: string;
  rating?: number;
}

export interface FilterState {
  genre: string;
  author: string;
  searchQuery: string;
  sortBy: 'date' | 'rating' | 'title';
}
