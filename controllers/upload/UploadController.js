const express = require('express');
const Upload = require('../../models/Upload');
const uuid = require('uuid');
const auth = require('../../middleware/auth');
const createMessageObject = require('../../helpers/createMessageObjectHelper');
const createSlug = require('../../helpers/createPostSlugHelper');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.files);
  // req.body.mv('./tmp/test.jpg');
});

module.exports = router;
