const express = require('express');
const Post = require('../../models/Post');
const uuid = require('uuid');
const auth = require('../../middleware/auth');
const createMessageObject = require('../../helpers/createMessageObjectHelper');

const router = express.Router();

router.get('/slug/:slug', (req, res) => {
  Post.find({ slug: req.params.slug }, (err, data) => {
    res.json(data.length ? data[0] : data);
  });
});

router.post('/', auth, (req, res) => {
  const post = new Post({
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
      squareUrl: req.body.coverImageSquare,
    },
    ...req.body,
  });

  const success = {
    id: post.id,
    title: post.title || '',
    slug: post.slug || '',
    creationDate: post.creationDate,
    content: post.content || '',
    excerpt: post.excerpt || '',
    coverImage: post.coverImage,
  };

  post
    .save()
    .then(() =>
      res.json(
        createMessageObject('success', 'Post saved successfully', success)
      )
    )
    .catch(err => res.json(createMessageObject('error', err.errmsg)));
});

module.exports = router;
