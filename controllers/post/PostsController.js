const express = require('express');
const mongoose = require('mongoose');
const createMessageObject = require('../../helpers/createMessageObjectHelper');

const router = express.Router();

router.get('/', (_, res) => {
  mongoose.connection.db.collection('posts', (err, col) => {
    if (err) {
      res.statusCode = 400;
      res.json(createMessageObject('error', err));
    }
    col.find({}).toArray((err, data) => {
      const result = data.map(
        ({ id, title, content, coverImage, excerpt, creationDate, slug }) => ({
          id,
          title,
          creationDate,
          slug,
          content,
          coverImage,
          excerpt,
        })
      );
      res.statusCode = 200;
      res.json(createMessageObject('success', '', result));
    });
  });
});

router.get('/recentStories', (_, res) => {
  mongoose.connection.db.collection('posts', (err, col) => {
    if (err) {
      res.statusCode = 400;
      res.json(createMessageObject('error', err));
    }
    col.find({}).toArray((err, data) => {
      const result = data.map(({ id, title, slug, coverImage }) => ({
        id,
        title,
        slug,
        image: coverImage.squareUrl,
      }));
      res.statusCode = 200;
      res.json(createMessageObject('success', '', result));
    });
  });
});

module.exports = router;
