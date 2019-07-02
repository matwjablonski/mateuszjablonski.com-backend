const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/me', (req, res) => {
  const data = {
    avatar: {
      hash: '3c97f5609aeb498c8ba5021fad8b4d6b',
    },
    name: 'Mateusz Jabłoński'
  }

  res.json(data);
})

app.listen(8000, function(){
  console.log('Server is running on port:', 8000);
});
