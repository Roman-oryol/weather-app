import { getWeatherData } from './weatherApi';
import { extractWeatherInfo } from './weatherParser';
import { getUserLocation } from './locationService';
import { geocodeCity } from './geocoder';
import {
  renderCurrentConditions,
  renderCurrentData,
  renderUserLocation,
} from './currentSectionUI';
import { renderWeeklyOverview } from './weeklyOverviewUI';
import { renderDayDetails } from './dayDetailsUI';
import { updateUnitToggleHandler } from './toggleUnits';

const searchForm = document.querySelector('.weather-card__search');
const searchInput = searchForm.querySelector('.weather-card__input');

const getUserLocationInput = async () => {
  const location = await geocodeCity(searchInput.value.trim());
  searchInput.value = '';
  return location;
};

const renderAll = (weather, isFahrenheit = false) => {
  renderUserLocation(weather.address);
  renderCurrentData();
  renderCurrentConditions(weather, isFahrenheit);
  renderWeeklyOverview(weather.days);
  renderDayDetails(weather.days[0], isFahrenheit);
};

const handleSearch = async (event) => {
  event.preventDefault();

  const location = await getUserLocationInput();
  const rawData = await getWeatherData(location);
  const weather = await extractWeatherInfo(rawData);

  renderAll(weather);
  updateUnitToggleHandler(location);
};

const renderAppWithLocation = async (location) => {
  const rawData = await getWeatherData(location);
  const weather = await extractWeatherInfo(rawData);
  renderAll(weather);
  console.log(rawData);
};

const initUI = async () => {
  const location = await getUserLocation();

  renderAppWithLocation(location);
  updateUnitToggleHandler(location);
};

initUI();

searchForm.addEventListener('submit', handleSearch);

export { renderAll };
