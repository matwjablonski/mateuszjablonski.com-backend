import express from 'express';
import models from '../../models';
import uuid from 'uuid';

const router = express.Router();

router.get('/slug/:slug', (req, res) => {
  // console.log(req);
  models.Post.find({ slug: req.params.slug }, (err, data) => {
    res.json(data.length ? data[0] : data);
  });
});

router.post('/', (req, res) => {
  const post = new models.Post({
    creationDate: new Date(),
    id: uuid.v4(),
    slug: req.body.title.toLowerCase().replace(new RegExp(' ', 'g'), '-'),
    coverImage: {
      url: req.body.coverImageUrl,
      source: req.body.coverImageSource,
      sourceUrl: req.body.coverImageSourceUrl,
      name: req.body.coverImageName,
      author: req.body.coverImageAuthor,
      authorUrl: req.body.coverImageAuthorUrl,
    },
    ...req.body,
  });

  const success = {
    status: 'success',
    data: {
      id: post.id,
      title: post.title || '',
      slug: post.slug || '',
      creationDate: post.creationDate,
      content: post.content || '',
      excerpt: post.excerpt || '',
      coverImage: post.coverImage,
    },
    message: 'Post saved successfully.',
  };

  post
    .save()
    .then(() => res.json(success))
    .catch(err => res.json({ status: 'error', message: err.errmsg }));
});

export default router;
