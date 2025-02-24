const Book = require('../models/Book');
const buildBookQuery = require('../utils/queryBuilder');
const createPagination = require('../utils/pagination');

const bookController = {
  async getBooks(req, res) {
    try {
      console.log('Request body:', req.body);
      
      const { page = 1, limit = 12 } = req.query;
      const { skip } = createPagination(parseInt(page), parseInt(limit));
      
      console.log('Pagination:', { page, limit, skip });
      
      const filters = buildBookQuery(req.body.filters || {});
      console.log('Built filters:', filters);

      const [books, total] = await Promise.all([
        Book.find(filters)
          .sort(req.query.sortBy ? { [req.query.sortBy]: req.query.sortOrder || 'asc' } : { title: 'asc' })
          .skip(skip)
          .limit(parseInt(limit)),
        Book.countDocuments(filters)
      ]);

      console.log(`Found ${books.length} books`);

      res.json({
        data: books,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      });
    } catch (error) {
      console.error('Error in getBooks:', error);
      res.status(500).json({ 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  async getBookById(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createBook(req, res) {
    try {
      const book = new Book(req.body);
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async updateBook(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      Object.assign(book, req.body);
      await book.save();
      res.json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteBook(req, res) {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async addReview(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      const review = {
        userId: req.user._id,
        rating: req.body.rating,
        comment: req.body.comment
      };

      book.reviews.push(review);
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = bookController;
