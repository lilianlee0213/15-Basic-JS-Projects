const modalBtn = document.querySelector('.modal-btn');
const modalOveraly = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.close-btn');

modalBtn.addEventListener('click', function () {
	modalOveraly.classList.toggle('open-modal');
});
closeBtn.addEventListener('click', function () {
	modalOveraly.classList.remove('open-modal');
});
