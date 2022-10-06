// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option

let editElement;
let editFlag = false;
let editID = '';

// ****** EVENT LISTENERS **********
// submit forms
form.addEventListener('submit', addItem);
// clear items
clearBtn.addEventListener('click', clearItems);
// load items
window.addEventListener('DOMContentLoaded', setupItems);
// ****** FUNCTIONS **********
function addItem(e) {
	e.preventDefault();
	const value = grocery.value;
	const id = new Date().getTime().toString();
	if (value && !editFlag) {
		// createListItem(id, value);
		const element = document.createElement('article');
		let attr = document.createAttribute('data-id');
		attr.value = id;
		// add attribute data-id: id in <article></article
		element.setAttributeNode(attr);
		// add class in <article>/<article>
		element.classList.add('grocery-item');
		// contents in <article>/<article>
		element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
		// append child
		list.appendChild(element);
		// show container
		container.classList.add('show-container');
		// add eventListener in both buttons
		const deleteBtn = element.querySelector('.delete-btn');
		deleteBtn.addEventListener('click', deleteItem);
		const editBtn = element.querySelector('.edit-btn');
		editBtn.addEventListener('click', editItem);
		// display alert
		displayAlert('item added to list', 'success');
		// add to local storage
		addToLocalStorage(id, value);
		// set to default
		setBackToDefault();
	} else if (value && editFlag) {
		editElement.innerHTML = value;
		displayAlert('item edited', 'success');
		// edit  local storage
		editLocalStorage(editID, value);
		setBackToDefault();
	} else {
		displayAlert('please enter your list items', 'danger');
	}
}

// display alert
function displayAlert(text, action) {
	alert.textContent = text;
	alert.classList.add(`alert-${action}`);
	// remove alert
	setTimeout(function () {
		alert.textContent = '';
		alert.classList.remove(`alert-${action}`);
	}, 1000);
}
// clear items
function clearItems() {
	const items = document.querySelectorAll('.grocery-item');
	if (items.length > 0) {
		items.forEach(function (item) {
			list.removeChild(item);
		});
	}
	container.classList.remove('show-container');
	displayAlert('empty list', 'danger');
	setBackToDefault();
	localStorage.removeItem('list');
}

function deleteItem(e) {
	const element = e.currentTarget.parentElement.parentElement;
	const id = element.dataset.id;
	list.removeChild(element);
	if (list.children.length === 0) {
		container.classList.remove('show-container');
	}
	displayAlert('item deleted', 'danger');
	setBackToDefault();
	removeFromLocalStorage(id);
}
function editItem(e) {
	const element = e.currentTarget.parentElement.parentElement;
	// set edit item
	editElement = e.currentTarget.parentElement.previousElementSibling;
	// set form value
	grocery.value = editElement.innerHTML;
	editFlag = true;
	editID = element.dataset.id;
	submitBtn.textContent = 'edit';
}
// set back to default
function setBackToDefault() {
	grocery.value = '';
	editFlag = false;
	editID = '';
	submitBtn.textContent = 'submit';
}

// ****** LOCAL STORAGE **********
// add to local storage
function addToLocalStorage(id, value) {
	const grocery = {id: id, value: value};
	let items = getLocalStorage();
	items.push(grocery);
	localStorage.setItem('list', JSON.stringify(items));
}
// get local storage
function getLocalStorage() {
	return localStorage.getItem('list')
		? JSON.parse(localStorage.getItem('list'))
		: [];
}
function removeFromLocalStorage(id) {
	let items = getLocalStorage();

	items = items.filter(function (item) {
		if (item.id !== id) {
			return item;
		}
	});

	localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value) {
	let items = getLocalStorage();
	items = items.map(function (item) {
		if (item.id === id) {
			item.value = value;
		}
		return item;
	});
	localStorage.setItem('list', JSON.stringify(items));
}
// ****** SETUP ITEMS **********
function setupItems() {
	let items = getLocalStorage();
	if (items.length > 0) {
		items.forEach(function (item) {
			createListItem(item.id, item.value);
		});
	}
	container.classList.add('show-container');
}
function createListItem(id, value) {
	const element = document.createElement('article');
	let attr = document.createAttribute('data-id');
	attr.value = id;
	element.setAttributeNode(attr);
	element.classList.add('grocery-item');
	element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
	// add event listeners to both buttons;
	const deleteBtn = element.querySelector('.delete-btn');
	deleteBtn.addEventListener('click', deleteItem);
	const editBtn = element.querySelector('.edit-btn');
	editBtn.addEventListener('click', editItem);

	// append child
	list.appendChild(element);
}
