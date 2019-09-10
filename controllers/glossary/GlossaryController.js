const express = require('express');
const mongoose = require('mongoose');
const createMessageObject = require('../../helpers/createMessageObjectHelper');

const uuid = require('uuid');
const auth = require('../../middleware/auth');
const Glossary = require('../../models/Glossary');

const router = express.Router();

router.get('/', (_, res) => {
  mongoose.connection.db.collection('posts', (err, col) => {
    if (err) {
      res.statusCode = 400;
      res.json(createMessageObject('error', err));
    }
    col.find({}).toArray((_, data) => {
      const result = data
        .map(({ id, entry, fullName, description, similar, categories }) => ({
          id,
          entry,
          fullName,
          description,
          similar,
          categories,
        }))
        .sort((a, b) => {
          if (a.entry < b.entry) {
            return -1;
          }
          if (a.entry > b.entry) {
            return 1;
          }
          return 0;
        });
    });

    res.statusCode = 200;
    res.json(createMessageObject('success', '', result));
  });
});

router.post('/', auth, (req, res) => {
  const glossaryEntry = new Glossary({
    id: uuid.v4(),
    entry: req.body.entry,
    fullName: req.body.fullName,
    similar: req.body.similar,
    description: req.body.description,
    categories: req.body.categories,
  });

  const success = {
    id: glossaryEntry.id,
  };

  glossaryEntry
    .save()
    .then(() =>
      res.json(
        createMessageObject(
          'success',
          'Glossary item saved successfully',
          success
        )
      )
    )
    .catch(err => res.json(createMessageObject('error', err.errmsg)));
});

module.exports = router;
