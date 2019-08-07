const mongoose = require('mongoose');
const User = require('./User');
const Post = require('./Post');

const connectDb = () =>
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

const models = { User, Post };

module.exports = { models, connectDb };
