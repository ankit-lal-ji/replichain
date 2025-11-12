const express = require('express');
const router = express.Router();
const Snapshot = require('../models/Snapshot');

// Create snapshot
router.post('/create', async (req, res) => {
  try {
    const snapshot = new Snapshot(req.body);
    await snapshot.save();
    res.status(201).json({ message: 'Snapshot saved ✅', snapshot });
  } catch (err) {
    res.status(500).json({ message: 'Error saving snapshot', error: err.message });
  }
});

// Get all snapshots
router.get('/', async (req, res) => {
  try {
    const snaps = await Snapshot.find().sort({ deployedAt: -1 });
    res.json(snaps);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching snapshots', error: err.message });
  }
});

// Rollback
router.post('/rollback/:version', async (req, res) => {
  try {
    const version = req.params.version;
    const snapshot = await Snapshot.findOne({ version });
    if (!snapshot) return res.status(404).json({ message: 'Version not found' });
    snapshot.status = 'rolled_back';
    snapshot.rolledBackAt = new Date();
    await snapshot.save();
    res.json({ message: `Rolled back to version ${version}`, snapshot });
  } catch (err) {
    res.status(500).json({ message: 'Error rolling back', error: err.message });
  }
});

module.exports = router;
