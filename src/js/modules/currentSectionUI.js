import { startOfToday } from 'date-fns';
import { createFormattedDate } from '../utils/utils';
import { weatherIcons } from '../utils/weatherIcons';

const currentWeatherSection = document.querySelector('.weather-card');
const locationEl = currentWeatherSection.querySelector('.weather-card__city');
const currentDayEl = currentWeatherSection.querySelector(
  '.weather-card__date .day',
);
const currentDateEl = currentWeatherSection.querySelector(
  '.weather-card__date .date',
);
const iconEl = currentWeatherSection.querySelector('.weather-card__icon img');
const currentTemp = currentWeatherSection.querySelector(
  '.weather-card__current-temp > span',
);
const currentConditionsEl = currentWeatherSection.querySelector(
  '.weather-card__desc',
);
const currentDayMaxTempEl = currentWeatherSection.querySelector(
  '.weather-card__temp-max',
);
const currentDayMinTempEl = currentWeatherSection.querySelector(
  '.weather-card__temp-min',
);
const currentHumidityEl = currentWeatherSection.querySelector(
  '.weather-card__extra-humidity > span',
);
const currentWindEl = currentWeatherSection.querySelector(
  '.weather-card__extra-wind > span',
);

const renderUserLocation = (location) => {
  if (location.includes('undefined')) {
    locationEl.textContent = 'Населенный пункт не найден';
    locationEl.style.color = '#d61515';
    return;
  }

  locationEl.textContent = location;
  locationEl.style.color = '';
};

const renderCurrentData = () => {
  const { weekdayFull, day, month } = createFormattedDate(startOfToday());

  currentDayEl.textContent =
    weekdayFull.charAt(0).toUpperCase() + weekdayFull.slice(1);
  currentDateEl.textContent = `${day} ${month}`;
};

const renderCurrentConditions = (data, isFahrenheit = false) => {
  const KMH_TO_MS = 1 / 3.6;
  const MPH_TO_MS = 0.44704;
  const unit = isFahrenheit ? '°F' : '°C';

  iconEl.src = weatherIcons[data.currentConditions.icon];
  currentTemp.textContent = Math.round(data.currentConditions.temp) + unit;
  currentConditionsEl.textContent = data.currentConditions.conditions;
  currentDayMaxTempEl.textContent = Math.round(data.days[0].tempmax) + unit;
  currentDayMinTempEl.textContent = Math.round(data.days[0].tempmin) + unit;
  currentHumidityEl.textContent = Math.round(data.currentConditions.humidity);
  currentWindEl.textContent = (
    data.currentConditions.windSpeed * (isFahrenheit ? MPH_TO_MS : KMH_TO_MS)
  ).toFixed(1);
};

export { renderCurrentConditions, renderCurrentData, renderUserLocation };
