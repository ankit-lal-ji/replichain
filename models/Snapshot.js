const mongoose = require('mongoose');

const snapshotSchema = new mongoose.Schema({
  version: { type: String, required: true },
  commitId: { type: String },
  status: {
    type: String,
    enum: ['success', 'failed', 'rolled_back'],
    default: 'success'
  },
  dockerImage: { type: String },
  deployedAt: { type: Date, default: Date.now },
  rolledBackAt: { type: Date },
  logs: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Snapshot', snapshotSchema);
