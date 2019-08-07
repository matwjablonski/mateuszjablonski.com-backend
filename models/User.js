const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' });
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    unique: false,
    required: true,
  },
  avatar: {
    type: String,
    unique: false,
  },
});

userSchema.pre('save', async next => {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.methods.generateAuthToken = async () => {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error({ error: 'Invalid login credentials' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' });
  }

  return user;
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
