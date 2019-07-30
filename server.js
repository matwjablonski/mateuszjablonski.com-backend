import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import postRouter from './controllers/post/post.controller';

import models, { connectDb } from './models';

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

// app.get('/api/posts', (req, res) => {});

app.use('/api/post', postRouter);

connectDb().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log('Server is running on port:', process.env.PORT);
  });
});
