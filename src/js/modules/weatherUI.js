import { startOfToday } from 'date-fns';
import { getWeatherData } from './weatherApi';
import { extractWeatherInfo } from './weatherParser';
import { createFormattedDate } from '../utils/utils';
import { getUserLocation } from './locationService';
import { geocodeCity } from './geocoder';
import {
  renderCurrentConditions,
  renderCurrentData,
  renderUserLocation,
} from './currentSectionUI';
import { renderWeeklyOverview } from './weeklyOverviewUI';

const searchForm = document.querySelector('.weather-card__search');
const searchInput = searchForm.querySelector('.weather-card__input');

const getUserLocationInput = async () => {
  const location = await geocodeCity(searchInput.value.trim());
  searchInput.value = '';
  return location;
};

function renderDayDetails(dayData) {
  // подробности по выбранному дню: температура по часам, осадки и пр.
}

const renderAll = (weather) => {
  renderUserLocation(weather.address);
  renderCurrentData();
  renderCurrentConditions(weather);
  renderWeeklyOverview(weather.days);
};

const handleSearch = async (event) => {
  event.preventDefault();

  const location = await getUserLocationInput();
  const rawData = await getWeatherData(location);
  const weather = await extractWeatherInfo(rawData);

  renderAll(weather);
};

const renderAppWithLocation = async (location) => {
  const rawData = await getWeatherData(location);
  const weather = await extractWeatherInfo(rawData);
  console.log(weather); // ! For Delate
  renderAll(weather);
};

const initUI = async () => {
  const location = await getUserLocation();

  renderAppWithLocation(location);
};

initUI();

searchForm.addEventListener('submit', handleSearch);
