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

// const daysOfMonth = {
//   January: 31,
//   February: leapYear(currentYear) ? 29 : 28,
//   March: 31,
//   April: 30,
//   May: 31,
//   June: 30,
//   July: 31,
//   August: 31,
//   September: 30,
//   October: 31,
//   November: 30,
//   December: 31
// };

const daysOfMonth = {
  0: 31,
  1: leapYear(currentYear) ? 29 : 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31
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
  const fragment = document.createDocumentFragment();
  for (let day = 1; day <= daysOfMonth[currentMonth]; day++) {
    const newDiv = document.createElement('div');
    newDiv.textContent = day;
    newDiv.classList.add('day');
    if (day === 1) {
      newDiv.classList.add('first-day');
    }
    if (day < currentDay) {
      newDiv.classList.add('disabled');
    } else if (day === currentDay) {
      newDiv.classList.add('today');
    }
    fragment.append(newDiv);
  }
  calendarElement.append(fragment);
};

const setFirstDay = () => {
  const date2 = new Date(currentYear, currentMonth, 1);
  if (date2.getDay() === 0) {
    return 7;
  } else return date2.getDay();
};

createCalendarHead();
rootStyles.setProperty('--first-day-column', setFirstDay());
createCalendar();
