import mongoose from 'mongoose';

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
  },
  content: {
    type: String,
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
