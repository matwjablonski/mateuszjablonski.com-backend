const jwt = require('jsonwebtoken');
const User = require('../models/User');
const createMessageObject = require('../helpers/createMessageObject.helper');

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const data = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY);
    const user = await User.findOne({ _id: data._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.statusCode = 401;
    res.json(
      createMessageObject('error', 'Not authorized to access this resource')
    );
  }
};

module.exports = auth;
