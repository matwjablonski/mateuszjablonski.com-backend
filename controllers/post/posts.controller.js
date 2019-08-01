const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', (_, res) => {
  mongoose.connection.db.collection('posts', (err, col) => {
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
      res.json(result);
    });
  });
});

module.exports = router
