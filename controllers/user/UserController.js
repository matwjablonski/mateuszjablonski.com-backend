const express = require('express');
const User = require('../../models/User');
const uuid = require('uuid');
const createMessageObject = require('../../helpers/createMessageObject.helper');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      id: uuid.v4(),
      password: req.body.password,
    });

    await newUser.save();
    const token = await newUser.generateAuthToken();
    const success = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      token: token,
    };
    res.statusCode = 201;
    res.json(
      createMessageObject('success', 'User created successfully.', success)
    );
  } catch (err) {
    res.statusCode = 400;
    res.json(createMessageObject('error', err.errmsg));
  }
});

router.post('/login', (req, res) => {});

router.get('/me', (req, res) => {});

router.post('/logout', (req, res) => {});

module.exports = router;
