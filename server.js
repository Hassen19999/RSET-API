require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    // Start the server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
  const express = require('express');
const User = require('./models/User');

const app = express();
// ...other code

// GET: Return all users
app.get('/users', (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

// POST: Add a new user to the database
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  newUser.save()
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});
// PUT: Edit a user by ID
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
  
    User.findByIdAndUpdate(id, { name, email }, { new: true })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred' });
      });
  });
  
  // DELETE: Remove a user by ID
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
  
    User.findByIdAndRemove(id)
      .then((user) => {
        if (user) {
          res.json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred' });
      });
  });