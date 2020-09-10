const newrelic = require('newrelic');
require('dotenv').config();
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

const carouselUrl = process.env.CAROUSEL_URL || 'http://localhost:3001';
const bookingUrl = process.env.BOOKING_URL || 'http://localhost:3002';
const reviewsUrl = process.env.REVIEWS_URL || 'http://localhost:3003';

app.get('/api/images/:id', (req, res) => {
  newrelic.setTransactionName('get');
  const id = req.params.id;
  axios.get(`${carouselUrl}/api/images/${id}`)
    .then((data) => res.send(data.data))
    .catch((error) => console.log(error));
});

app.post('/api/images', (req, res) => {
  newrelic.setTransactionName('post');
  const id = req.params.id;
  axios.post(`${carouselUrl}/api/images`)
    .then(() => res.sendStatus(200))
    .catch((error) => console.log(error));
});

app.get('/api/booking/:id', (req, res) => {
  const id = req.params.id;
  axios.get(`${bookingUrl}/api/booking/${id}`)
    .then((data) => res.send(data.data))
    .catch((error) => console.log(error));
});

app.get('/api/overall_reviews/:id', (req, res) => {
  const id = req.params.id;
  axios.get(`${reviewsUrl}/api/overall_reviews/${id}`)
    .then((data) => res.send(data.data))
    .catch((error) => console.log(error));
});

app.get('/api/individual_reviews/:id', (req, res) => {
  const id = req.params.id;
  axios.get(`${reviewsUrl}/api/individual_reviews/${id}`)
    .then((data) => res.send(data.data))
    .catch((error) => console.log(error));
});
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
