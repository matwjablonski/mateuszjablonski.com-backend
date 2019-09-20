const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  userId: {
    type: String,
  },
  meetings: {
    contracted: {
      type: Number,
    },
    completed: [
      {
        date: {
          type: Date,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  modules: {},
  courseType: {
    type: String,
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
