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

const header = document.querySelector('header');
const main = document.querySelector('main');

const updateID = (bookElement) => {
    bookElement.id = `book_${myLibrary.indexOf(book) + 1}`;
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
    didRead.addEventListener('click', () => {
        book.isRead = !book.isRead;
        didRead.textContent = `Did read: ${book.isRead ? '✅' : '❌'}`;
    });


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


const addNewBook = document.querySelector('button.new-book')
let formCreated = false;

const form = document.createElement('form');
    form.action = 'submit';
    form.innerHTML = `
    <form action="submit">
            <section class="form-title">
                <label for="book_title">Title</label>
                <input type="text" id="book_title" name="book_title">
            </section>
            <section class="form-author">
                <label for="book_author">Author</label>
                <input type="text" id="book_author" name="book_author">
            </section>
            <section class="form-pages">
                <label for="book_pages">Pages</label>
                <input type="text" id="book_pages" name="book_pages">
            </section>
            <section class="form-read">
                <label for="book_read">Did Read</label>
                <input type="checkbox" id="book_read" name="book_read">
            </section>
            <section class="form-notes">
                <label for="book_notes">Notes</label>
                <textarea id="book_notes" name="book_notes"></textarea>
            </section>
            <section class="form-submit">
                <button type="submit" id="add">Add</button>
            </section>
        </form>
    `;

addNewBook.addEventListener('click', () => {
    if (!formCreated) {
        const arrow = document.querySelector('#arrow');
        arrow.textContent = '▼';

        header.appendChild(form);

        formCreated = true;
    } else if (formCreated) {
        const arrow = document.querySelector('#arrow');
        arrow.textContent = '◀';
        
        header.removeChild(form);

        formCreated = false;
    }
});