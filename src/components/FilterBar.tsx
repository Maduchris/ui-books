import React from 'react';
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (name: string, value: string) => void;
  genres: string[];
  authors: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  genres,
  authors,
}) => {
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(event.target.name, event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    onFilterChange(event.target.name, event.target.value);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '2fr 1fr 1fr 1fr',
          },
        }}
      >
        <TextField
          fullWidth
          name="searchQuery"
          label="Search books..."
          variant="outlined"
          value={filters.searchQuery}
          onChange={handleTextChange}
          size="small"
        />

        <FormControl size="small">
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            name="genre"
            value={filters.genre}
            label="Genre"
            onChange={handleSelectChange}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel id="author-label">Author</InputLabel>
          <Select
            labelId="author-label"
            name="author"
            value={filters.author}
            label="Author"
            onChange={handleSelectChange}
          >
            <MenuItem value="">All Authors</MenuItem>
            {authors.map((author) => (
              <MenuItem key={author} value={author}>
                {author}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            name="sortBy"
            value={filters.sortBy}
            label="Sort By"
            onChange={handleSelectChange}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="date">Publication Date</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};
