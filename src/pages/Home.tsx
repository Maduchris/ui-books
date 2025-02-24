import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import { BookCard } from '../components/BookCard';
import { FilterBar } from '../components/FilterBar';
import { Book, FilterState } from '../types';
import { bookAPI } from '../services/api';

export const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    genre: '',
    author: '',
    searchQuery: '',
    sortBy: 'title',
  });

  const [genres, setGenres] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await bookAPI.searchBooks(filters.searchQuery);
        setBooks(response);
        
        // Extract unique genres and authors with proper typing
        const uniqueGenres = Array.from(
          new Set(response.map((book: Book) => book.genre))
        ) as string[];
        const uniqueAuthors = Array.from(
          new Set(response.map((book: Book) => book.author))
        ) as string[];
        
        setGenres(uniqueGenres);
        setAuthors(uniqueAuthors);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [filters.searchQuery]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredBooks = books.filter((book) => {
    const matchesGenre = !filters.genre || book.genre === filters.genre;
    const matchesAuthor = !filters.author || book.author === filters.author;
    const matchesSearch =
      !filters.searchQuery ||
      book.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesGenre && matchesAuthor && matchesSearch;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'date':
        return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'title':
      default:
        return a.title.localeCompare(b.title);
    }
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{
          textAlign: 'center',
          color: 'primary.main',
          mb: 4,
          fontSize: { xs: '2.5rem', sm: '3.5rem' },
        }}
      >
        Book Hub
      </Typography>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        genres={genres}
        authors={authors}
      />

      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>

      {filteredBooks.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
            p: 3,
            backgroundColor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No books found matching your criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};
