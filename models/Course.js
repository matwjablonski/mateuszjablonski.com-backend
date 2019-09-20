const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
