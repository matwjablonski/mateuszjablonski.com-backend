const express = require('express');
const Course = require('../../models/Course');
const uuid = require('uuid');
const auth = require('../../middleware/auth');
const createMessageObject = require('../../helpers/createMessageObjectHelper');

const router = express.Router();

router.get('/', () => {});

module.exports = router;
