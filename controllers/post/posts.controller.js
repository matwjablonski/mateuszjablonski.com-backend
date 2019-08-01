import express from 'express';
import mongoose from 'mongoose';
import models from '../../models';

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

export default router;
