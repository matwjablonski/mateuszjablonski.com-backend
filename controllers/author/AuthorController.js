const express = require('express');
const createMessageObject = require('../../helpers/createMessageObjectHelper');

const router = express.Router();

router.get('/me', (_, res) => {
  const data = {
    avatar: {
      hash: '3c97f5609aeb498c8ba5021fad8b4d6b',
    },
    name: 'Mateusz Jabłoński',
  };

  res.statusCode = 200;
  res.json(
    createMessageObject('success', 'Author data downloaded successfully.', data)
  );
});

module.exports = router;
