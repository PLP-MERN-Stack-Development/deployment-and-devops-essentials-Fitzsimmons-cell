require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bugRoutes = require('./routes/bugRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/bugs', bugRoutes);

// Health check
app.get('/', (req, res) => res.send('Bug tracker API running'));

const PORT = process.env.PORT || 5000;

// Only connect to MongoDB if not running tests
if (process.env.NODE_ENV !== 'test') {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('❌ MONGO_URI not set in environment variables');
    process.exit(1); // Stop the server
  }

  mongoose.connect(mongoURI)
    .then(() => {
      console.log('✅ MongoDB connected successfully');
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => {
      console.error('❌ MongoDB connection error:', err);
      process.exit(1);
    });
}

module.exports = app; // export app for tests
