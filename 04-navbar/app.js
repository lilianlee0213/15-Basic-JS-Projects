const links = document.querySelector('.links');
const toggleBtn = document.querySelector('.nav-toggle');

toggleBtn.addEventListener('click', function () {
	// if (links.classList.contains('show-links')) {
	// 	links.classList.remove('show-links');
	// } else {
	// 	links.classList.add('show-links');
	// }

	links.classList.toggle('show-links');
});
