// Cache DOM elements
const addBook = document.querySelector('#add-book');
const libraryDisplay = document.querySelector('.library');
const closeForm = document.querySelector('.modal-close');
const formModal = document.querySelector('.form-modal');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('form');


class Library {

    displayForm() {
        formModal.classList.remove('fadeOut');
        formModal.classList.add('fadeIn');
        formContainer.classList.add('fadeIn');
        addBook.classList.remove('fadeIn');
        addBook.classList.add('fadeOut');
    }

    createNewBook() {
        const bookName = document.querySelector('#book').value;
        const author = document.querySelector('#author').value;
        let newBook = new Book(bookName, author);
        newBook.addToDom();
    }

    resetForm() {
        formModal.classList.remove('fadeIn');
        formModal.classList.add('fadeOut');
        formContainer.classList.remove('fadeIn');
        formContainer.classList.add('fadeOut');
        addBook.classList.remove('fadeOut');
        addBook.classList.add('fadeIn');
        form.reset();
    }

}

class Book {

    constructor(book, author) {
        this.book = book;
        this.author = author;
    }

    addToDom() {

        const entryContainer = document.createElement('div');
        const entryTitle = document.createElement('h1');
        entryTitle.innerHTML = this.book;
        const entryAuthor = document.createElement('h2');
        entryAuthor.innerHTML = this.author;
        entryContainer.append(entryTitle, entryAuthor);
        entryContainer.className = 'library-item';
        libraryDisplay.prepend(entryContainer);

    }

}

// Create the library object
const library = new Library;

// Bind events
addBook.addEventListener('click', library.displayForm);
formModal.addEventListener('click', function (event) {
    if (!event.target.closest('.form-container')) library.resetForm();
})
closeForm.addEventListener('click', library.resetForm);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    library.createNewBook();
    library.resetForm();
});
