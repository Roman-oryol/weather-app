import { getWeatherData } from './weatherApi';
import { extractWeatherInfo } from './weatherParser';
import { renderAll } from './weatherUI';

const unitToggleBtn = document.getElementById('unit-toggle-btn');

const updateUnitToggleHandler = (location) => {
  unitToggleBtn.textContent = '°C / °F';

  if (unitToggleBtn._clickHandler) {
    unitToggleBtn.removeEventListener('click', unitToggleBtn._clickHandler);
  }

  const handleClick = async () => {
    const isFahrenheit = document.body.classList.toggle('unit-fahrenheit');
    unitToggleBtn.textContent = isFahrenheit ? '°F / °C' : '°C / °F';

    const updatedWeather = await getWeatherData(location, isFahrenheit);
    const parsedWeather = await extractWeatherInfo(updatedWeather);
    renderAll(parsedWeather, isFahrenheit);
  };
  unitToggleBtn._clickHandler = handleClick;

  unitToggleBtn.addEventListener('click', handleClick);
};

export { updateUnitToggleHandler };
