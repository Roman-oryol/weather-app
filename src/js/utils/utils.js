import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const parseDate = (dateString) => new Date(dateString);

const getFormattedWeekday = (dateString, short = false) => {
  return format(parseDate(dateString), short ? 'EEE' : 'EEEE', { locale: ru });
};

const getFormattedDayMonth = (dateString) => {
  return format(dateString, 'dd', { locale: ru });
};

const getFormattedMonth = (dateString) => {
  return format(parseDate(dateString), 'MMMM', { locale: ru });
};

const createFormattedDate = (dateString) => {
  return {
    weekdayShort: getFormattedWeekday(dateString, true),
    weekdayFull: getFormattedWeekday(dateString),
    day: getFormattedDayMonth(dateString),
    month: getFormattedMonth(dateString),
  };
};

export { createFormattedDate };
