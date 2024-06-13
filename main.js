const myLibrary = [];

function Book(title, author, pages, isRead, notes) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.notes = notes;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

const book1 = new Book('Crime and Punishment', 'F. Dostoevsky', 492, true, 'Really good, I recommend it to everyone.');
const book2 = new Book('The Picture of Dorian Gray', 'O. Wilde', 304, false, 'Always wanted to read this one, but never quite got to it.');
const book3 = new Book('Fahrenheit 451', 'R. Bradbury', 156, true, 'One of my favorite dystopias.');

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);


const main = document.querySelector('main');

const updateID = (bookElement) => {
    bookElement.setAttribute('id', `book_${myLibrary.indexOf(book) + 1}`)
};

const drawBook = (book) => {
    const newBook = document.createElement('article');
    newBook.classList.add('card');

    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.title;
    bookTitle.classList.add('title');

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;
    bookAuthor.classList.add('author');

    newBook.appendChild(bookTitle);
    newBook.appendChild(bookAuthor);

    const info = document.createElement('section');
    info.classList.add('gap');

    const bookPages = document.createElement('p');
    bookPages.textContent = `Pages: ${book.pages}`;
    bookPages.classList.add('pages');

    const didRead = document.createElement('button');
    didRead.textContent = `Did read: ${book.isRead ? '✅' : '❌'}`;
    didRead.classList.add('read');

    const beforeNotes = document.createElement('p');
    beforeNotes.textContent = 'Notes:';
    beforeNotes.classList.add('before-notes');

    const bookNotes = document.createElement('p');
    bookNotes.textContent = book.notes;
    bookNotes.classList.add('notes');

    info.appendChild(bookPages);
    info.appendChild(didRead);
    info.appendChild(beforeNotes);
    info.appendChild(bookNotes);

    newBook.appendChild(info);
    newBook.setAttribute('id', `book_${myLibrary.indexOf(book) + 1}`)

    main.appendChild(newBook);
};

myLibrary.forEach(book => {
    drawBook(book);
});