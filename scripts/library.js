const addBook = document.querySelector('#add-book');
const libraryContainer = document.querySelector('.library');
const formModal = document.querySelector('.form-modal');
const form = document.querySelector('form');
const closeForm = document.querySelector('.close');

let myLibrary = [];

function Book(book, author, stars) {
    this.book = book;
    this.author = author;
    this.stars = stars;
}

function addToDisplay(book) {
    const newBook = document.createElement('div');
    const newTitle = document.createElement('h1');
    const newAuthor = document.createElement('h2');
    newTitle.innerHTML = book.book;
    newAuthor.innerHTML = book.author;
    newBook.append(newTitle);
    newBook.append(newAuthor);
    newBook.className = 'library-item';
    libraryContainer.prepend(newBook);
}

function addToLibrary() {
    const book = document.querySelector('#book').value;
    const author = document.querySelector('#author').value;
    // const stars = document.querySelector('#stars').value;
    const stars = 4;
    const newBook = new Book(book, author, stars);
    myLibrary.push(newBook);
    addToDisplay(newBook);
    book.value = '';
    author.value = '';
    // stars.value = '';
}

addBook.addEventListener('click', function () {
    formModal.style.visibility = 'visible';
    form.style.visibility = 'visible';
})

closeForm.addEventListener('click', function () {
    form.style.visibility = 'hidden';
    formModal.style.visibility = 'hidden';
})

form.addEventListener('submit', function (e) {
    e.preventDefault();
    addToLibrary();
})