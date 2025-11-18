require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bugRoutes = require('./routes/bugRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/bugs', bugRoutes);

// health
app.get('/', (req, res) => res.send('Bug tracker API running'));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('✅ MongoDB connected');
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = app; // export app for tests
