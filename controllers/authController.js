const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {
  async register(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = authController;
