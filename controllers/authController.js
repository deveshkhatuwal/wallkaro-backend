const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const author = require('../models/author');
const register = async (req, res) => {
  try {
    const { username, password  } = req.body;

    // Check if the username already exists
    const existingUser = await author.findOne({ username });

    if (existingUser) {
      // If the username already exists, send a response indicating it
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAuthor = new author({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ username: newAuthor.username, userId: newAuthor._id }, 'secret', { expiresIn: '100h' });
    await newAuthor.save();

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error in /register route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
  // Login API
const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists
      const user = await author.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Create a JWT token
      const token = jwt.sign({ username: user.username, userId: user._id }, 'secret', { expiresIn: '100h' });
  
      res.json({ token });
    } catch (error) {
      console.error('Error in /login route:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports = {
    login,
    register,
  };