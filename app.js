const dotenv = require('dotenv/config');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// import models, { connectDb } from './models';
const PostsRouter = require('./controllers/post/PostsController');
const PostRouter = require('./controllers/post/PostController');
const UserRouter = require('./controllers/user/UserController');
const AuthorRouter = require('./controllers/author/AuthorController');
const JobsRouter = require('./controllers/jobs/JobsController');
const PageRouter = require('./controllers/page/PageController');
const UploadRouter = require('./controllers/upload/UploadController');
const GlossaryRouter = require('./controllers/glossary/GlossaryController');
const createMessageObject = require('./helpers/createMessageObjectHelper');
const db = require('./db/db');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (_, res) => {
  res.json(createMessageObject('success', 'API connected successfully.'));
});

app.get('/', (req, res) => {
  res.json('api connected');
});

app.use('/api/author', AuthorRouter);
app.use('/api/users', UserRouter);
app.use('/api/post', PostRouter);
app.use('/api/posts', PostsRouter);
app.use('/api/content', PageRouter);
app.use('/api/jobs', JobsRouter);
app.use('/api/glossary', GlossaryRouter);
app.use('/api/uploads', UploadRouter);

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: './tmp/',
  })
);

db().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log('Server is running on port:', process.env.PORT);
  });
});
