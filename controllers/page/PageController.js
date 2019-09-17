const express = require('express');
const Page = require('../../models/Page');
const uuid = require('uuid');
const auth = require('../../middleware/auth');
const createMessageObject = require('../../helpers/createMessageObjectHelper');
const createSlug = require('../../helpers/createPostSlugHelper');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
});

module.exports = router;
