const { body, param, query, validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      message: 'Validation Error',
      errors: errors.array()
    });
  };
};

const bookValidation = {
  create: [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('author').trim().notEmpty().withMessage('Author is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('genre').isArray().withMessage('Genre must be an array'),
    body('genre.*').trim().notEmpty().withMessage('Genre items cannot be empty'),
    body('publicationDate').isISO8601().withMessage('Invalid publication date'),
    body('isbn').trim().notEmpty().withMessage('ISBN is required')
      .matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)
      .withMessage('Invalid ISBN format'),
    body('coverImage').trim().notEmpty().withMessage('Cover image URL is required')
      .isURL().withMessage('Cover image must be a valid URL')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid book ID'),
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('author').optional().trim().notEmpty().withMessage('Author cannot be empty'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('genre').optional().isArray().withMessage('Genre must be an array'),
    body('genre.*').optional().trim().notEmpty().withMessage('Genre items cannot be empty'),
    body('publicationDate').optional().isISO8601().withMessage('Invalid publication date'),
    body('isbn').optional().trim().notEmpty().withMessage('ISBN cannot be empty')
      .matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)
      .withMessage('Invalid ISBN format'),
    body('coverImage').optional().trim().notEmpty().withMessage('Cover image URL cannot be empty')
      .isURL().withMessage('Cover image must be a valid URL')
  ],
  review: [
    param('id').isMongoId().withMessage('Invalid book ID'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().isLength({ min: 1, max: 1000 })
      .withMessage('Comment must be between 1 and 1000 characters')
  ]
};

const authValidation = {
  register: [
    body('username').trim().isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters'),
    body('email').trim().isEmail().withMessage('Invalid email address')
      .normalizeEmail(),
    body('password').isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
      .withMessage('Password must contain at least one number, one lowercase and one uppercase letter')
  ],
  login: [
    body('email').trim().isEmail().withMessage('Invalid email address')
      .normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
  ]
};

module.exports = {
  validate,
  bookValidation,
  authValidation
};
