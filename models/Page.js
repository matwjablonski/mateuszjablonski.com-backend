const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  data: [
    {
      image: {},
      title: {
        type: String,
      },
      content: {
        type: String,
      },
      position: {
        type: Number,
      },
      size: {
        type: String,
        enum: [3, 4, 6, 8, 9, 12],
        default: 12,
      },
    },
  ],
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
