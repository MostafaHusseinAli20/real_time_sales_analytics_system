const request = require('supertest');
const express = require('express');
const orderRoutes = require('../routes/orders');
const analyticsRoutes = require('../routes/analytics');
const recommendationRoutes = require('../routes/recommendations');
const weatherRoute = require('../routes/weather');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/orders', orderRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/weather', weatherRoute);

describe('API Integration Tests', () => {
  test('POST /orders should create an order', async () => {
    const response = await request(app)
      .post('/orders')
      .send({
        product_id: 1,
        quantity: 2,
        price: 50
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  test('GET /analytics should return analytics data', async () => {
    const response = await request(app).get('/analytics');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('total_revenue');
  });

  test('GET /recommendations should return mock or AI suggestions', async () => {
    const response = await request(app).get('/recommendations');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('suggestions');
  });

  test('GET /weather should return weather data for a city', async () => {
    const response = await request(app).get('/weather');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('temperature');
    expect(response.body).toHaveProperty('condition');
  });
});
