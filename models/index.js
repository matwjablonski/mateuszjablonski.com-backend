const mongoose = require('mongoose');
const UserModel = require('./user.model');
const Post = require('./post.model');

const connectDb = () =>
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  });

const models = { UserModel, Post };

module.exports = { models, connectDb };
