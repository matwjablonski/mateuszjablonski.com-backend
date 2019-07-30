import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    unique: false,
  },
  avatar: {
    type: String,
    unique: false,
  },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
