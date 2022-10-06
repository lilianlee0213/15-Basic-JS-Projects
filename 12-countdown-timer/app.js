const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const weekdays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
// months are ZERO index based;
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

//*******to give specific deadline*******
// let futureDate = new Date(2020, 3, 24, 11, 30, 0);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

function getRemainingTime() {
	const today = new Date().getTime();
	let t = futureDate - today;

	//1s = 1000ms
	//1m = 60s
	//1hr = 60m
	//1d = 24hrs
	const oneDay = 24 * 60 * 60 * 1000;
	const oneHour = 60 * 60 * 1000;
	const oneMinute = 60 * 1000;

	// calculating values
	let daysLeft = Math.floor(t / oneDay);
	let hoursLeft = Math.floor((t % oneDay) / oneHour);
	let minutesLeft = Math.floor((t % oneHour) / oneMinute);
	let secondsLeft = Math.floor((t % oneMinute) / 1000);
	const values = [daysLeft, hoursLeft, minutesLeft, secondsLeft];

	//formating '0'
	function format(item) {
		if (item < 10) {
			return (item = `0${item}`);
		}
		return item;
	}

	items.forEach((item, index) => {
		item.innerHTML = format(values[index]);
	});

	//stop coundown when 0
	if (t < 0) {
		clearInterval(countdown);
		deadline.innerHTML = `<h4 class="expired">Sorry, the giveaway has expired.</h4>`;
	}
}
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
