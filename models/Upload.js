const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ['image', 'doc'],
  },
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
