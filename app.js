const dotenv = require('dotenv/config');
const express = require('express');
const cors = require('cors');
const PostsRouter = require('./controllers/post/PostsController');
const PostRouter = require('./controllers/post/PostController');
const UserRouter = require('./controllers/auth/AuthController');
const db = require('./models');

const app = express();
app.use(cors());
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
app.use('/api/users', UserRouter);
app.use('/api/post', PostRouter);
app.use('/api/posts', PostsRouter);

db.connectDb().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log('Server is running on port:', process.env.PORT);
  });
});
