const newrelic = require('newrelic');
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '/../client')));
app.use('/:id', express.static(path.join(__dirname, '/../client')));

app.use(bodyParser.json());

const carouselUrl = process.env.CAROUSEL_URL || 'http://localhost:3001';
const bookingUrl = process.env.BOOKING_URL || 'http://localhost:3002';
const overallReviewsUrl = process.env.REVIEWS_URL || 'http://localhost:3003';
const indivReviewsUrl = process.env.REVIEWS_URL || 'http://localhost:3003';

const carouselProxy = createProxyMiddleware('/api/images', { target: carouselUrl });
app.use('/api/images', carouselProxy);

const bookingProxy = createProxyMiddleware('/api/booking', { target: bookingUrl });
app.use('/api/booking', bookingProxy);

const overallReviewsProxy = createProxyMiddleware(
  '/api/overall_reviews', { target: overallReviewsUrl }
);
app.use('/api/overall_reviews', overallReviewsProxy);

const indivReviewsProxy = createProxyMiddleware(
  '/api/individual_reviews', { target: indivReviewsUrl }
);
app.use('/api/individual_reviews', indivReviewsProxy);

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
