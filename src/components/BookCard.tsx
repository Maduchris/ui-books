import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  Chip,
  IconButton,
  Collapse,
} from '@mui/material';
import { Book } from '../types';
import { ReviewForm } from './ReviewForm';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={book.coverImage || 'https://via.placeholder.com/200x300?text=No+Cover'}
        alt={book.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {book.author}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={book.rating} readOnly precision={0.5} size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({book.reviews.length} reviews)
          </Typography>
        </Box>
        <Chip
          label={book.genre}
          size="small"
          sx={{ mb: 1 }}
          color="primary"
          variant="outlined"
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {book.description}
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="button"
            sx={{ cursor: 'pointer' }}
            onClick={() => setShowReviews(!showReviews)}
          >
            Reviews
          </Typography>
          <IconButton
            onClick={() => setShowReviews(!showReviews)}
            size="small"
            sx={{ transform: showReviews ? 'rotate(180deg)' : 'none' }}
          >
            {showReviews ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>

        <Collapse in={showReviews}>
          <Box sx={{ mt: 2 }}>
            {book.reviews.map((review) => (
              <Box key={review.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="body2">{review.comment}</Typography>
              </Box>
            ))}
            {!showReviewForm && (
              <Typography
                variant="button"
                sx={{ cursor: 'pointer', color: 'primary.main' }}
                onClick={() => setShowReviewForm(true)}
              >
                Add Review
              </Typography>
            )}
            {showReviewForm && (
              <ReviewForm bookId={book.id} onReviewSubmitted={handleReviewSubmitted} />
            )}
          </Box>
        </Collapse>
      </Box>
    </Card>
  );
};
