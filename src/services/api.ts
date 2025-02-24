import axios from 'axios';
import { Book, Review, User } from '../types';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (username: string, password: string): Promise<User> => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  register: async (username: string, password: string): Promise<User> => {
    const response = await api.post('/auth/register', { username, password });
    return response.data;
  },
};

export const bookAPI = {
  searchBooks: async (query: string): Promise<Book[]> => {
    try {
      const response = await axios.get(`${API_URL}/books`, {
        params: { query },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching books:', error);
      return [];
    }
  },

  getBookById: async (id: string): Promise<Book | null> => {
    try {
      const response = await axios.get(`${API_URL}/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting book:', error);
      return null;
    }
  },

  createBook: async (bookData: Partial<Book>): Promise<Book> => {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  updateBook: async (id: string, bookData: Partial<Book>): Promise<Book> => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  deleteBook: async (id: string): Promise<void> => {
    await api.delete(`/books/${id}`);
  },

  addReview: async (bookId: string, review: Omit<Review, 'id' | 'createdAt'>): Promise<Review | null> => {
    try {
      const response = await axios.post(`${API_URL}/books/${bookId}/reviews`, review);
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      return null;
    }
  },
};
