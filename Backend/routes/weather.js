const express = require('express');
const router = express.Router();
const { getWeather } = require('../app/Services/OpenWeatherApi.js');

router.get('/', async (req, res) => {
  const city = req.query.city || 'Cairo';
  const weatherData = await getWeather(city);

  if (weatherData.error) {
    return res.status(500).json({ error: weatherData.error });
  }

  res.json(weatherData);
});

module.exports = router;
