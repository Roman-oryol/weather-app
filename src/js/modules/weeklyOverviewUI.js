import { createFormattedDate } from '../utils/utils';
import { weatherIcons } from '../utils/weatherIcons';

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

const handleChooseDay = (e) => {
  if (e.target.closest('.forecast-list__item')) {
    const selectedDay = e.target.closest('.forecast-list__item');
    setActiveDay(selectedDay);
  }
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

  weekdayEl.textContent = weekdayShort;
  dayEl.textContent = day;
  monthEl.textContent = month;
  weatherIcon.src = weatherIcons[icon];
  tempMinEl.textContent = tempmin;
  tempMaxEl.textContent = tempmax;
};

const renderWeeklyOverview = (daysArr) => {
  dailyOverviews.forEach((dayOverview, index) => {
    renderDayOverview(dayOverview, daysArr[index]);
  });
};

weeklyForecastList.addEventListener('click', handleChooseDay);

export { renderWeeklyOverview };
