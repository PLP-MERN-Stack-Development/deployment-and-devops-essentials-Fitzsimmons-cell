const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');

// Create bug
router.post('/bugs', async (req, res) => {
  try {
    console.log('POST /api/bugs payload:', req.body);
    const bug = new Bug(req.body);
    await bug.save();
    res.status(201).json(bug);
  } catch (err) {
    console.error('Error creating bug:', err);
    res.status(400).json({ error: err.message });
  }
});

// Get all bugs
router.get('/bugs', async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) {
    console.error('Error fetching bugs:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update bug
router.put('/:id', async (req, res) => {
  try {
    console.log(`PUT /api/bugs/${req.params.id} patch:`, req.body);
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    console.error('Error updating bug:', err);
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting bug:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
