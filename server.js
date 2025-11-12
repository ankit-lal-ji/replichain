require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const snapshotRoutes = require('./routes/snapshotRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection failed:', err.message));

app.get('/', (req, res) => res.send('RepliChain Backend Running 🚀'));

// Routes
app.use('/api/snapshots', snapshotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
