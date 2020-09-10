const newrelic = require('newrelic');
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '/../client')));
app.use('/:id', express.static(path.join(__dirname, '/../client')));

app.use(bodyParser.json());

const carouselProxy = createProxyMiddleware(
  process.env.CAROUSEL_URL || 'http://localhost:3001/api/images'
);

const bookingProxy = createProxyMiddleware(
  process.env.BOOKING_URL || 'http://localhost:3002/api/booking'
);

const overallReviewsProxy = createProxyMiddleware(
  process.env.OVERALL_REVIEWS_URL || 'http://localhost:3003/api/overall_reviews'
);

const individualReviewsProxy = createProxyMiddleware(
  process.env.INDIVIDUAL_REVIEWS_URL || 'http://localhost:3003/api/individual_reviews'
);

app.use('/api/images', carouselProxy);
app.use('/api/booking', bookingProxy);
app.use('/api/overall_reviews', overallReviewsProxy);
app.use('/api/individual_reviews', individualReviewsProxy);

// Note to self: find a way to ensure New Relic still gets transactions from proxy middleware

// app.get('/api/images/:id', (req, res) => {
//   newrelic.setTransactionName('get');
//   const id = req.url.slice(12);
//   axios.get(`${carouselUrl}/api/images/${id}`)
//     .then((data) => res.send(data.data))
//     .catch((error) => console.log(error));
// });

// app.post('/api/images', (req, res) => {
//   newrelic.setTransactionName('post');
//   const id = req.url.slice(12);
//   axios.post(`${carouselUrl}/api/images`)
//     .then(() => res.sendStatus(200))
//     .catch((error) => console.log(error));
// });

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
