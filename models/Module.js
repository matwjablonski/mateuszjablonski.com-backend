const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  mainText: {
    type: String,
  },
  subModules: [
    {
      title: {
        type: String,
      },
      position: {
        type: Number,
      },
      content: {
        type: String,
      },
    },
  ],
});

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
