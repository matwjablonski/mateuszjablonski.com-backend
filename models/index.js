import mongoose from 'mongoose';

import UserModel from './user.model';
import Post from './post.model';

const connectDb = () =>
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const models = { UserModel, Post };

export { connectDb };

export default models;
