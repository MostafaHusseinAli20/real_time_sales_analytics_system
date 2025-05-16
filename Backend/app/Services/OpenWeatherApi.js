const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const DEFAULT_CITY = 'Cairo'; // يمكنك تغييره لأي مدينة

async function getWeather(city = DEFAULT_CITY) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fc8ad8886d9c5d96663da9d944535748`
    );

    const temp = response.data.main.temp;
    const condition = response.data.weather[0].main;
    const description = response.data.weather[0].description;
    const humidity = response.data.main.humidity;

    return {
      city,
      temperature: temp,
      condition,
      description,
      humidity,
      recommendation: getRecommendationByTemp(temp).join('\n')
    };

  } catch (error) {
    console.error('❌ Weather API Error:', error.message);
    return {
      error: true,
      message: 'تعذر جلب بيانات الطقس. تأكد من صحة API Key أو اسم المدينة.'
    };
  }
}

function getRecommendationByTemp(temp) {
  if (temp >= 30) {
    return [
      "🔥 الجو حار - روّج للمشروبات الباردة مثل العصائر و Pepsi.",
      "💸 اعرض خصم 10% على المشروبات الباردة."
    ];
  } else if (temp <= 15) {
    return [
      "❄️ الجو بارد - روّج للمشروبات الساخنة مثل القهوة والشاي.",
      "💸 اعرض Bundle على القهوة والشاي."
    ];
  } else {
    return [
      "🌤️ الجو معتدل - ركّز على العروض المتنوعة."
    ];
  }
}

module.exports = {
  getWeather
};
