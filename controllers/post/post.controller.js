import express from 'express';
import models from '../../models';
import uuid from 'uuid';

const router = express.Router();

router.post('/', (req, res) => {
  const post = new models.Post({
    creationDate: new Date(),
    id: uuid.v4(),
    slug: req.body.title.toLowerCase().replace(' ', '-'),
    image: {
      url: req.body.image.url,
      source: req.body.image.source,
      alt: req.body.image.alt
    },
    ...req.body,
  });

  const success = {
    status: 'success',
    data: {
      id: post.id,
      title: post.title,
      slug: post.slug,
      creationDate: post.creationDate,
      content: post.content,
      image: post.image
    },
    message: 'Post saved successfully.',
  };

  post.save().then(() => res.json(success));
});

export default router;
