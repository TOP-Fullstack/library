// Form variables
const formModal = document.querySelector('.form-modal');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('form');

// Create an array to track the stars in script
const stars = [];
for (i = 1; i < 6; i++) {
    stars.push(document.querySelector(`.form-star${i}`))
};

// Add an event listener to each star, and change the src based on which star is hovered over, or clicked
let rating;
let regex = /\d+/;

stars.forEach(element => {

    element.addEventListener('mouseover', function () {

        // Parse out the star number that is being hovered over
        let num = element.className.match(regex);
        for (let i = 0; i < num; i++) {
            stars[i].src = 'img/star.svg'
        }
    });

    element.addEventListener('click', function () {

        let num = element.className.match(regex);
        for (let i = 0; i < num; i++) {
            stars[i].src = 'img/star.svg'
        };
        rating = num;
    });

    // If no star has been clicked, revert all stars to the outline version on mouse out. If there has been a star clicked, only change the src of the stars back to an outline if they are past that clicked star
    element.parentNode.addEventListener('mouseout', function () {
        if (!rating) element.src = 'img/staroutline.svg';
        else {
            for (let i = rating; i < stars.length; i++) {
                stars[i].src = 'img/staroutline.svg';
            }
        }
    });
});

// Controls
const addBook = document.querySelector('#add-book');
const closeForm = document.querySelector('.modal-close');

// Library array + display library
const library = document.querySelector('.library');

// Display form when the add button is clicked
addBook.addEventListener('click', function () {
    formModal.classList.remove('fadeOut');
    formModal.classList.add('fadeIn');
    formContainer.classList.add('fadeIn');
    addBook.classList.remove('fadeIn');
    addBook.classList.add('fadeOut');
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    addToLibrary();
    resetForm();
});

// Close the modal+form if the user clicks it or the "X" in the corner
formModal.addEventListener('click', function (event) {
    if (!event.target.closest('.form-container')) resetForm();
})
closeForm.addEventListener('click', resetForm);

// Instantiate book class
function Book(book, author, rating) {
    this.book = book;
    this.author = author;
    this.rating = rating;
}

function resetForm() {
    formModal.classList.remove('fadeIn');
    formModal.classList.add('fadeOut');
    formContainer.classList.remove('fadeIn');
    formContainer.classList.add('fadeOut');
    addBook.classList.remove('fadeOut');
    addBook.classList.add('fadeIn');
    stars.forEach(element => {
        element.src = 'img/staroutline.svg';
        rating = 0;
    });
    form.reset();
}

// Function to add stars to the library item based on rating provided by user
function addStars(rating) {
    const stars = document.createElement('div');
    stars.classList.add = 'library-stars';
    for (let i = 0; i < rating; i++) {
        const star = document.createElement('img');
        star.src = 'img/starblack.svg';
        stars.append(star);
    }
    return stars;
}

function addToLibrary() {

    // Create a new instance of the Book class and save it in the myLibrary array
    const book = document.querySelector('#book').value;
    const author = document.querySelector('#author').value;
    const starRating = rating;
    const entry = new Book(book, author, starRating);

    // Create the display for that specific library item and add it to the display
    const entryContainer = document.createElement('div');
    const entryTitle = document.createElement('h1');
    entryTitle.innerHTML = entry.book;
    const entryAuthor = document.createElement('h2');
    entryAuthor.innerHTML = entry.author;
    const entryRating = addStars(rating);
    entryContainer.append(entryTitle, entryAuthor, entryRating);
    entryContainer.className = 'library-item';
    entryContainer.className.add = 'fadeIn';
    library.prepend(entryContainer);
}