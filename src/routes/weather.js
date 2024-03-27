var express = require('express');
var router = express.Router();
var weatherService = require("../services/weatherService")

/* GET weather info. */
router.get('/:cityName', (req, res, next) => {
  weatherService.getCityCurrentWeather(req.params.cityName)
    .then(weatherInfo => {
      res.render('weather', { ...weatherInfo, returnPath: "/", title: weatherInfo.cityName + " weather" });
    })
    .catch(error => {
      console.error('Error fetching weather info:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;