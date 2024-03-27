const { default: axios } = require('axios');
const config = require('../configs/config');
const path = require('path');

const getCityCurrentWeather = async (cityName) => {
  if (!config.cityList.includes(cityName)) {
    throw new Error(`City ${cityName} isn't supported`)
  }
  
  const apiPath = path.join(config.apiBase, config.forecastPath);

  let request;

  try {
    request = await axios.get(apiPath, {
      params: {
        q: cityName, units: "metric", appid: config.apiKey
      }
    });
  } catch (err) {
    console.error(err);
  }

  const result = request.data;

  const iconLink = path.join(
    config.imgBase, 
    config.imgPath, 
    result.weather[0].icon + config.imgSuffix);

  const weatherInfo = {
    cityName: cityName,
    weatherType: result.weather[0].main,
    weatherInfo: result.weather[0].description,
    temp: result.main.temp,
    pressure: result.main.pressure,
    humidity: result.main.humidity,
    iconLink: iconLink
  };

  return weatherInfo;
}

module.exports = { getCityCurrentWeather }