const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const uuid = require('uuid');
const auth = require('../../middleware/auth');
const createMessageObject = require('../../helpers/createMessageObjectHelper');

const router = express.Router();

router.post('/', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    id: uuid.v4(),
    password: req.body.password,
    permissions: [],
    type: 'reader',
    dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : null,
  });

  try {
    await newUser.save();
    const token = await newUser.generateAuthToken();
    const success = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      permissions: newUser.permissions || [],
      token: token,
      dateOfBirth: newUser.dateOfBirth,
      phoneNumber: newUser.phoneNumber,
    };
    res.statusCode = 201;
    res.json(
      createMessageObject('success', 'User created successfully.', success)
    );
  } catch (err) {
    const msg = err.errmsg || err.message;
    res.statusCode = 400;
    res.json(createMessageObject('error', msg));
  }
});

router.get('/', auth, async (_, res) => {
  mongoose.connection.db.collection('users', (err, col) => {
    if (err) {
      res.statusCode = 400;
      res.json(createMessageObject('error', err));
    }
    col.find({}).toArray((err, data) => {
      const result = data.map(
        ({ name, id, email, avatar, userType, permissions }) => ({
          name,
          id,
          email,
          avatar,
          userType,
          permissions,
        })
      );
      res.statusCode = 200;
      res.json(createMessageObject('success', '', result));
    });
  });
});

router.get('/me', auth, (req, res) => {
  const { name, email, id, userType, permissions, dateOfBirth } = req.user;
  const success = {
    name,
    email,
    id,
    userType,
    dateOfBirth,
    permissions: permissions || [],
  };

  res.statusCode = 200;
  res.json(
    createMessageObject(
      'success',
      'User data downloaded successfully.',
      success
    )
  );
});

router.get('/userId/:userId', auth, (req, res) => {
  User.find({ id: req.params.userId }, (err, data) => {
    if (err || !data.length) {
      res.statusCode = 400;
      res.json(createMessageObject('error', 'User do not exist.'));
      return;
    }

    const userData = {
      name: data.length ? data[0].name : null,
      email: data.length ? data[0].email : null,
      id: data.length ? data[0].id : null,
      avatar: data.length ? data[0].avatar : null,
      userType: data.length ? data[0].userType : null,
      dateOfBirth: data.length ? data[0].dateOfBirth : null,
      phoneNumber: data.length ? data[0].phoneNumber : null,
      permissions: data.length ? data[0].permissions : null,
    };
    res.statusCode = 200;
    res.json(userData);
  });
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      res.statusCode = 401;
      res.json(createMessageObject('error', 'Wrong email or password.'));
    }

    const token = await user.generateAuthToken();

    res.statusCode = 200;

    const success = {
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
        userType: user.userType,
        permissions: user.permissions || [],
      },
      token,
    };

    res.json(createMessageObject('success', 'Logged successfully.', success));
  } catch (err) {
    res.statusCode = 400;
    res.json(createMessageObject('error', err));
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });

    await req.user.save();

    res.json(createMessageObject('success', 'Logout successfully.'));
  } catch (error) {
    res.statusCode = 500;
    res.json(createMessageObject('error', error));
  }
});

module.exports = router;
