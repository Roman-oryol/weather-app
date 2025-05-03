import { getLocationInRussian } from './weatherApi';

export const extractWeatherInfo = async (data) => {
  const { city, country, town, village } = await getLocationInRussian(
    data.latitude,
    data.longitude,
  );
  let address = `${city ? city : town ? town : village}, ${country}`;

  return {
    address,
    currentConditions: {
      conditions: data.currentConditions.conditions,
      humidity: data.currentConditions.humidity,
      icon: data.currentConditions.icon,
      temp: data.currentConditions.temp,
      windSpeed: data.currentConditions.windspeed,
    },
    days: data.days,
  };
};
