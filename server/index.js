const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '/../client')));
app.use('/:id', express.static(path.join(__dirname, '/../client')));

app.use(bodyParser.json());

app.get('/api/images/:id', (req, res) => {
  newrelic.setTransactionName('get');
  const id = req.url.slice(12);
  axios.get(`http://localhost:3001/api/images/${id}`)
    .then((data) => res.send(data.data))
    .catch((error) => console.log(error));
});

app.post('/api/images', (req, res) => {
  newrelic.setTransactionName('post');
  const id = req.url.slice(12);
  axios.post(`http://localhost:3001/api/images`)
    .then(() => res.sendStatus(200))
    .catch((error) => console.log(error));
});

app.get('/api/booking/:id', (req, res) => {
  const id = req.url.slice(13);
  axios.get(`http://localhost:3002/api/booking/${id}`)
    .then((data) => res.send(data.data))
    .catch((error) => console.log(error));
});

app.get('/api/overall_reviews/:id', (req, res) => {
  const id = req.url.slice(21);
  axios.get(`http://localhost:3003/api/overall_reviews/${id}`)
    .then((data) => res.send(data.data))
    .catch((error) => console.log(error));
});

app.get('/api/individual_reviews/:id', (req, res) => {
  const id = req.url.slice(24);
  axios.get(`http://localhost:3003/api/individual_reviews/${id}`)
    .then((data) => res.send(data.data))
    .catch((error) => console.log(error));
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
