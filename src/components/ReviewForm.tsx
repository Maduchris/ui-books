import React, { useState } from 'react';
import {
  Box,
  Rating,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { bookAPI } from '../services/api';

interface ReviewFormProps {
  bookId: string;
  onReviewSubmitted: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, onReviewSubmitted }) => {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setError('Please provide a rating');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await bookAPI.addReview(bookId, {
        bookId,
        rating,
        comment,
      });

      setRating(0);
      setComment('');
      onReviewSubmitted();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography component="legend">Rating:</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          precision={0.5}
        />
      </Box>

      <TextField
        fullWidth
        multiline
        rows={3}
        name="comment"
        label="Your review (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isSubmitting}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        sx={{ alignSelf: 'flex-start' }}
      >
        {isSubmitting ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Submitting...
          </>
        ) : (
          'Submit Review'
        )}
      </Button>
    </Box>
  );
};
