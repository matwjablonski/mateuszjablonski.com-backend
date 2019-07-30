import mongoose from 'mongoose';

import UserModel from './user.model';
import PostModel from './post.model';

console.log(process.env.DATABASE_URL);

const connectDb = () =>
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const models = { UserModel, PostModel };

export { connectDb };

export default models;
