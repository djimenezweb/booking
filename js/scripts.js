const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const currentDay = date.getDate();
const rootStyles = document.documentElement.style;
const calendarElement = document.getElementById('calendar');
const formElement = document.getElementById('form');
const dinnersElement = document.getElementById('dinners');
const shiftElement = document.getElementById('shift');
const hoursElement = document.getElementById('hours');
const reserveElement = document.getElementById('reserve');
const reserveStatusElement = document.getElementById('reserve-status');

const leapYear = year => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  } else {
    return false;
  }
};

const daysOfMonth = {
  January: 31,
  February: leapYear(currentYear) ? 29 : 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31
};

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const createCalendarHead = () => {
  const fragment = document.createDocumentFragment();
  daysOfWeek.forEach(day => {
    const newDiv = document.createElement('div');
    newDiv.textContent = day;
    fragment.append(newDiv);
  });
  calendarElement.prepend(fragment);
};

const createCalendar = () => {
  const newDiv = document.createElement('div');
  newDiv.textContent = '1';
  newDiv.classList.add('first-day');
  rootStyles.setProperty('first-day', '0');
  calendarElement.prepend(newDiv);
};

createCalendarHead();
