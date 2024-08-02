const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ _id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
