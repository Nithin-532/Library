const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createCard(book) {
  const div = document.createElement('div');
  const heading = document.createElement('h2');
  heading.textContent = book.title;
  const authorToAdd = document.createElement('p');
  authorToAdd.innerHTML = `Written by - <span>${book.author}</span>`;
  authorToAdd.classList.add("author-context");
  const pagesToAdd = document.createElement('p');
  pagesToAdd.textContent = `Pages: ${book.pages}`;
  const bookCompleted = document.createElement('p');
  bookCompleted.textContent = book.read ? "Completed" : "Pending";
  if (book.read) {
    bookCompleted.classList.add('book-completed');
  } else {
    bookCompleted.classList.add('book-inProgress');
  }
  const remove = document.createElement('button');
  remove.classList.add('remove');
  remove.dataset.value = myLibrary.length;
  remove.textContent = 'Remove';
  div.append(heading, authorToAdd, pagesToAdd, bookCompleted, remove);
  div.classList.add('card');
  container.appendChild(div);
}

function displayBooks() {
  myLibrary.forEach(book => {
    createCard(book);
  })
}

function changeStatus(event) {
  let value = event.textContent;
  console.log(value);
  if (value === 'Completed') {
    event.textContent = 'Pending';
    event.classList.remove('book-completed');
    event.classList.add('book-inProgress');
  } else {
    event.textContent = 'Completed';
    event.classList.remove('book-inProgress');
    event.classList.add('book-completed');
  }
}

const container = document.querySelector('.container');

function removeBook(index) {
  myLibrary.splice(index - 1, 1);
  console.log(myLibrary);
}

container.addEventListener('click', function(e) {
  const element = e.target;
  if (element.textContent === 'Completed' || element.textContent === "Pending") {
    changeStatus(element);
  }
  if (element.textContent === 'Remove') {
    removeBook(element.dataset.value);
    let card = element.parentNode;
    card.remove();
    container.innerHTML = "";
    displayBooks();
  }
})

function addBookToLibrary(book) {
  myLibrary.push(book);
  createCard(book);
}

const dialog = document.querySelector(".my-modal");

const addBook = document.querySelector('.add-book');
addBook.addEventListener('click', () => {
  dialog.showModal();
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.reset();
});

const title = document.querySelector('.title');
const author = document.querySelector('.author');
const pages = document.querySelector('.pages');

const submit = document.querySelector('.submit');
const cancel = document.querySelector('.cancel');

submit.addEventListener('click', () => {
  let newTitle = title.value;
  let newAuthor = author.value;
  let newPages = pages.value;
  let read = document.querySelector('#read').checked;
  const newBook = new Book(newTitle, newAuthor, newPages, read);
  addBookToLibrary(newBook);
  dialog.close();
});


dialog.addEventListener("click", e => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
})

cancel.addEventListener('click', () => {
  dialog.close();
})