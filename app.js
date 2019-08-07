const dotenv = require('dotenv/config');
const express = require('express');
const cors = require('cors');
const PostsRouter = require('./controllers/post/PostsController');
const PostRouter = require('./controllers/post/PostController');
const UserRouter = require('./controllers/user/UserController');
const AuthorRouter = require('./controllers/author/AuthorController');
const createMessageObject = require('./helpers/createMessageObjectHelper');
const db = require('./db/db');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (_, res) => {
  res.json(createMessageObject('success', 'API connected successfully.'));
});

app.use('/api/author', AuthorRouter);
app.use('/api/users', UserRouter);
app.use('/api/post', PostRouter);
app.use('/api/posts', PostsRouter);

db().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log('Server is running on port:', process.env.PORT);
  });
});
