const express = require('express');
const Course = require('../../models/Course');
const uuid = require('uuid');
const auth = require('../../middleware/auth');
const createMessageObject = require('../../helpers/createMessageObjectHelper');

const router = express.Router();

router.get('/id/:id', auth, (req, res) => {
  Course.find({ id: req.params.id }, (err, data) => {
    res.json(data.length ? data[0] : data);
  });
});

router.post('/type/:type', (req, res) => {
  const course = {
    title: '',
    meetings: {
      contracted: 0,
    },
    courseType: req.params.type,
  };

  switch (req.params.type) {
    case '':
    default:
      course.title = 'anc';
      course.meetings.contracted = 32;
      break;
  }

  let newCourse = new Course({
    ...course,
    id: uuid.v4(),
    userId: req.body.userId,
  });

  const success = {
    id: newCourse.id,
    title: newCourse.title,
  };

  newCourse
    .save()
    .then(() =>
      res.json(
        createMessageObject('success', 'Post saved successfully', success)
      )
    )
    .catch(err => res.json(createMessageObject('error', err.errmsg)));
});

router.put('/newMeeting/:id', auth, async (req, res) => {
  Course.findOne({ id: req.params.id }, (err, data) => {
    data.meetings.nextMeeting = new Date(
      `${req.body.meetingDate} ${req.body.meetingTime}`
    );
    data
      .save()
      .then(() => {
        res.json(
          createMessageObject(
            'success',
            'New meeting add successfully',
            success
          )
        );
      })
      .catch(err => res.json(createMessageObject('error', err.errmsg)));
  });
});

module.exports = router;
