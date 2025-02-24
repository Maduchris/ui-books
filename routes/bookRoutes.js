const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');

router.post('/search', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/', auth, bookController.createBook);
router.put('/:id', auth, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);
router.post('/:id/reviews', auth, bookController.addReview);

module.exports = router;
