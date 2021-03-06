const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  creationDate: {
    type: Date,
  },
  title: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
  },
  excerpt: {
    type: String,
  },
  coverImage: {
    type: Map,
    of: String,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
