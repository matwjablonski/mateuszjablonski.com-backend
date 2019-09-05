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
      const result = data
        .map(({ id, title, coverImage, excerpt, creationDate, slug }) => ({
          id,
          title,
          creationDate,
          slug,
          coverImage,
          excerpt,
        }))
        .sort((a, b) => (a.creationDate > b.creationDate ? 0 : 1));

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
      const result = data
        .map(({ id, title, slug, coverImage }) => ({
          id,
          title,
          slug,
          image: coverImage.squareUrl,
        }))
        .filter((item, itemIndex) => {
          if (itemIndex < 5) {
            return item;
          }
          return null;
        })
        .sort((a, b) => (a.creationDate > b.creationDate ? 0 : 1));
      res.statusCode = 200;
      res.json(createMessageObject('success', '', result));
    });
  });
});

module.exports = router;
