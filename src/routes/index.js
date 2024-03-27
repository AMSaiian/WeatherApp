var express = require('express');
var router = express.Router();
var config = require("../configs/config");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Weather app', 
    cities: config.cityList.map(city => ({
      path: `/weather/${city}`,
      name: city
    }))
  });
});

module.exports = router;
