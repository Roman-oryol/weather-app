export const getWeatherData = async (location, isFahrenheit = false) => {
  const baseURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/`;
  const period = 'next6days';
  const keyAPI = 'key=SQW4ECGR9DYSSQWQ4A92XA3R8';
  const lang = 'lang=ru';
  const unitGroup = `unitGroup=${isFahrenheit ? 'us' : 'metric'}`;
  const url = `${baseURL}${period}?${keyAPI}&${lang}&${unitGroup}`;

  const request = await fetch(url);
  return await request.json();
};

export const getLocationInRussian = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=ru`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'WeatherApp/1.0 (roman.oryol83@gmail.com)',
    },
  });

  if (!response.ok) {
    throw new Error('Ошибка при получении адреса');
  }

  const data = await response.json();
  return data.address;
};
