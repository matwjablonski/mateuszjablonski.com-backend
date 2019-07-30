import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  creationDate: {
    type: Date,
    unique: false,
  },
  title: {
    type: String,
    unique: false,
  },
});

const PostModel = mongoose.model('Post', postSchema);

export default PostModel;
