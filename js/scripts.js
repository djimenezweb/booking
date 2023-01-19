// CONSTANTES
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

let selectedDay;

// Función para saber si un año es bisiesto
const leapYear = year => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  } else {
    return false;
  }
};

// OBJETOS Y ARRAYS
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

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const hours = {
  morning: {
    start: 6,
    end: 14
  },
  afternoon: {
    start: 15,
    end: 22
  }
};

// FUNCIONES

// Función para crear la cabecera del calendario con los días de la semana
const createCalendarHead = () => {
  const fragment = document.createDocumentFragment();
  daysOfWeek.forEach(day => {
    const newDiv = document.createElement('div');
    newDiv.textContent = day;
    fragment.append(newDiv);
  });
  calendarElement.prepend(fragment);
};

// Función para crear el calendario
const createCalendar = () => {
  const fragment = document.createDocumentFragment();
  for (let day = 1; day <= daysOfMonth[months[currentMonth]]; day++) {
    const newDiv = document.createElement('div');
    newDiv.textContent = day;
    newDiv.classList.add('day');
    newDiv.dataset.day = day;
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

// Función para colocar el primer día del mes en su sitio
const setFirstDay = () => {
  const date2 = new Date(currentYear, currentMonth, 1);
  let column = date2.getDay() === 0 ? 7 : date2.getDay();
  rootStyles.setProperty('--first-day-column', column);
};

// Función que devuelve en qué día de la semana cae un día del mes y año en curso
const checkDay = day => {
  const date2 = new Date(currentYear, currentMonth, day);
  return date2.getDay();
};

// Función que devuelve el número de comensales según el día de la semana
const setDinners = day => {
  const daySelected = checkDay(day);
  if (daySelected >= 1 && daySelected <= 4) {
    return 8;
  } else {
    return 15;
  }
};

// Función para crear el desplegable de horas
const createHours = shift => {
  hoursElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  let newOption = document.createElement('option');
  newOption.textContent = 'Select hour';
  newOption.value = 0;
  fragment.append(newOption);
  for (let index = hours[shift].start; index <= hours[shift].end; index++) {
    newOption = document.createElement('option');
    newOption.textContent = `${index}:00`;
    newOption.value = `${index}:00`;
    fragment.append(newOption);
    if (index < hours[shift].end) {
      newOption = document.createElement('option');
      newOption.textContent = `${index}:30`;
      newOption.value = `${index}:30`;
      fragment.append(newOption);
    }
  }
  hoursElement.append(fragment);
};

// Función para crear el desplegable de turnos (mañana o tarde)
const createShifts = () => {
  shiftElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  let newOption = document.createElement('option');
  newOption.textContent = 'Select shift';
  newOption.value = 0;
  fragment.append(newOption);
  newOption = document.createElement('option');
  newOption.textContent = 'Morning';
  newOption.value = 'morning';
  fragment.append(newOption);
  if (checkDay(calendarElement.querySelector('.selected').dataset.day) > 0) {
    newOption = document.createElement('option');
    newOption.textContent = 'Afternoon';
    newOption.value = 'afternoon';
  }
  fragment.append(newOption);
  shiftElement.append(fragment);
};

// Función para crear el desplegable de número de comensales
const createDinners = day => {
  dinnersElement.removeAttribute('disabled');
  const fragment = document.createDocumentFragment();
  let newOption = document.createElement('option');
  newOption.textContent = 'Number of dinners';
  newOption.value = 0;
  fragment.append(newOption);
  const numberOfLoops = setDinners(day);
  for (let index = 1; index <= numberOfLoops; index++) {
    newOption = document.createElement('option');
    if (index === 1) {
      newOption.value = 1;
      newOption.textContent = index + ' dinner';
    } else {
      newOption.value = index;
      newOption.textContent = index + ' dinners';
    }
    fragment.append(newOption);
  }
  dinnersElement.append(fragment);
};

// El calendario escucha clics, aplica recuadro al día seleccionado y llama a la función createDinners, que crea el desplegable de número de comensales
calendarElement.addEventListener('click', ev => {
  shiftElement.disabled = true;
  hoursElement.disabled = true;
  reserveElement.disabled = true;
  document.querySelectorAll('.day').forEach(item => item.classList.remove('selected'));
  if (ev.target.classList.contains('disabled') || !ev.target.classList.contains('day')) return;
  selectedDay = ev.target.dataset.day;
  ev.target.classList.add('selected');
  createDinners(ev.target.dataset.day);
});

// El desplegable de comensales escucha cambios y llama a la función createShifts, que crea el desplegable de turnos
dinnersElement.addEventListener('change', () => {
  shiftElement.removeAttribute('disabled');
  createShifts();
});

// El desplegable de turnos escucha cambios y llama a la función createHours, que crea el desplegable de turnos
shiftElement.addEventListener('change', ev => {
  hoursElement.removeAttribute('disabled');
  if (ev.target.value === '0') return;
  createHours(ev.target.value);
});

// El desplegable de horas escucha cambios
hoursElement.addEventListener('change', ev => {
  reserveElement.disabled = false;
  reserveStatusElement.textContent = `Has seleccionado una reserva para ${dinnersElement.value} persona(s) el día ${selectedDay} a las ${hoursElement.value}`;
});

// Funciones que crean la cabecera del calendario, el calendario y coloca el primer día en su sitio.
createCalendarHead();
createCalendar();
setFirstDay();
