const express = require('express');
const User = require('../../models/User');
const uuid = require('uuid');

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
      status: 'success',
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        token: token,
      },
      message: 'User created successfully.',
    };
    res.statusCode = 201;
    res.json(success);
  } catch (err) {
    res.statusCode = 400;
    res.json({ status: 'error', message: err.errmsg });
  }
});

router.post('/login', (req, res) => {});

router.get('/me', (req, res) => {});

router.post('/logout', (req, res) => {});

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.json({
      success: false,
      message: 'Authentication failed! Please check the request',
    });
  }
};

module.exports = router;
