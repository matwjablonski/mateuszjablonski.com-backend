const express = require('express');
const createMessageObject = require('../../helpers/createMessageObjectHelper');

const router = express.Router();

router.get('/me', (_, res) => {
  const data = {
    avatar: {
      hash: '3c97f5609aeb498c8ba5021fad8b4d6b',
    },
    images: [
      'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/64855471_2367795253462662_2167997708885819392_n.jpg?_nc_cat=104&_nc_oc=AQnxsQr-bemEQiMZqPEPIgTUS51DOJequwPi1keC-01xTJOgiHz0DOKmv1nMki1XPwE&_nc_ht=scontent-waw1-1.xx&oh=882850565e666697d36d6e390d0d5eca&oe=5DD2FDF5',
    ],
    name: 'Mateusz Jabłoński',
    description: '',
  };

  res.statusCode = 200;
  res.json(
    createMessageObject('success', 'Author data downloaded successfully.', data)
  );
});

module.exports = router;
