const dotenv = require('dotenv/config');
const express = require('express');
const cors = require('cors');
const postsRouter = require('./controllers/post/posts.controller');
const postRouter = require('./controllers/post/post.controller');

// import models, { connectDb } from './models';

const whitelist = ['http://localhost:3000', 'http://mateuszjablonski.com'];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/me', (req, res) => {
  const data = {
    avatar: {
      hash: '3c97f5609aeb498c8ba5021fad8b4d6b',
    },
    name: 'Mateusz Jabłoński',
  };

  res.json(data);
});

app.get('/', (req, res) => {
  res.json('api connected');
});

// app.get('/api/posts', (req, res) => {});

app.use('/api/post', postRouter);
app.use('/api/posts', postsRouter);

// connectDb().then(async () => {
//   app.listen(process.env.PORT, () => {
//     console.log('Server is running on port:', process.env.PORT);
//   });
// });
app.listen(process.env.PORT, () => {
  console.log('Server is running on port:', process.env.PORT);
});
