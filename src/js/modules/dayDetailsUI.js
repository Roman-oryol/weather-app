import { weatherIcons } from '../utils/weatherIcons';

const KMH_TO_MS = 1 / 3.6;
const MBAR_TO_MMHG = 0.750062;
const MPH_TO_MS = 0.44704;
const dayOverviewTable = document.getElementById('day-overview');

dayOverviewTable.classList.add('day-overview');

const renderDayDetails = (dayData, isFahrenheit = false) => {
  const unit = isFahrenheit ? '°F' : '°C';

  dayOverviewTable.innerHTML = '';

  dayOverviewTable.innerHTML = `
  <colgroup>
    <col> 
    <col style="width: 40px;">
    <col> 
    <col>
    <col>
    <col>
    <col>
    <col>
  </colgroup>
    <thead class="day-overview__header">
      <tr>
        <th></th>
        <th></th>
        <th>Температура,<br>${unit}</th>
        <th>Чувствуется как, ${unit}</th>
        <th>Давление,<br>мм рт. ст.</th>
        <th>Влажность,<br>%</th>
        <th>Ветер,<br>м/с</th>
        <th>Вероятность осадков, %</th>
      </tr>
    </thead>
    <tbody>
      ${dayData.hours
        .map(
          (hour) => `
          <tr>
            <th class="day-overview__header">${hour.datetime.slice(0, 5)}</th>
            <td class="day-overview__icon">
              <img src="${weatherIcons[hour.icon]}">
            </td>
            <td>${Math.round(hour.temp)}</td>
            <td>${Math.round(hour.feelslike)}</td>
            <td>${Math.round(hour.pressure * MBAR_TO_MMHG)}</td>
            <td>${Math.round(hour.humidity)}</td>
            <td>${(hour.windspeed * (isFahrenheit ? MPH_TO_MS : KMH_TO_MS)).toFixed(1)}</td>
            <td>${hour.precipprob}</td>
          </tr>
        `,
        )
        .join('')}
    </tbody>
  `;
};

export { renderDayDetails };
