import { createFormattedDate } from '../utils/utils';
import { weatherIcons } from '../utils/weatherIcons';
import { renderDayDetails } from './dayDetailsUI';

const weeklyForecastList = document.querySelector('.forecast-list');
const dailyOverviews = weeklyForecastList.querySelectorAll(
  '.forecast-list__item',
);

const setActiveDay = (dayEl) => {
  dailyOverviews.forEach((dayOverview) => {
    if (dayOverview === dayEl) {
      dayOverview.classList.add('weather-day--active');
    } else {
      dayOverview.classList.remove('weather-day--active');
    }
  });
};

const handleChooseDay = (e, dayObj) => {
  const selectedDay = e.target.closest('.forecast-list__item');
  const selectedDate = selectedDay.dataset.date;
  setActiveDay(selectedDay);
  renderDayDetails(dayObj);

  console.log(selectedDate);
  console.log(dayObj);
};

const renderDayOverview = (dayOverviewEl, dayObj) => {
  const { datetime, icon, tempmax, tempmin } = dayObj;
  const { weekdayShort, day, month } = createFormattedDate(datetime);
  const weekdayEl = dayOverviewEl.querySelector('.weather-day__weekday');
  const dayEl = dayOverviewEl.querySelector('.weather-day__day');
  const monthEl = dayOverviewEl.querySelector('.weather-day__month');
  const weatherIcon = dayOverviewEl.querySelector('.weather-day__icon img');
  const tempMinEl = dayOverviewEl.querySelector('.weather-day__temp-min');
  const tempMaxEl = dayOverviewEl.querySelector('.weather-day__temp-max');

  if (dayOverviewEl._clickHandler) {
    dayOverviewEl.removeEventListener('click', dayOverviewEl._clickHandler);
  }

  const clickHandler = (e) => handleChooseDay(e, dayObj);
  dayOverviewEl._clickHandler = clickHandler;

  dayOverviewEl.addEventListener('click', clickHandler);

  dayOverviewEl.dataset.date = datetime;
  weekdayEl.textContent = weekdayShort;
  dayEl.textContent = day;
  monthEl.textContent = month;
  weatherIcon.src = weatherIcons[icon];
  tempMinEl.textContent = Math.round(tempmin);
  tempMaxEl.textContent = Math.round(tempmax);
};

const renderWeeklyOverview = (daysArr) => {
  dailyOverviews.forEach((dayOverview, index) => {
    renderDayOverview(dayOverview, daysArr[index]);
  });
};

export { renderWeeklyOverview };
