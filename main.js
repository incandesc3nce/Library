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


const drawBook = (book) => {
    const newBook = document.createElement('article');
    newBook.classList.add('card');

    const deleteContainer = document.createElement('div');
    deleteContainer.classList.add('delete-container');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.title = 'Remove book';
    deleteButton.innerHTML = '&#11198;';

    deleteContainer.appendChild(deleteButton);
    newBook.appendChild(deleteContainer);

    deleteButton.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        newBook.remove();
    });


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
                <input type="text" id="book_title" minlength="1" name="book_title" required >
            </section>
            <section class="form-author">
                <label for="book_author">Author</label>
                <input type="text" id="book_author" name="book_author" minlength="3" required>
            </section>
            <section class="form-pages">
                <label for="book_pages">Pages</label>
                <input type="number" min="1" id="book_pages" name="book_pages" required>
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

        form.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        const add = document.querySelector('#add');

        add.addEventListener('click', (event) => {
            event.preventDefault();
            const bookTitle = document.querySelector('#book_title');
            const bookAuthor = document.querySelector('#book_author');
            const bookPages = document.querySelector('#book_pages');
            const bookRead = document.querySelector('#book_read');
            const bookNotes = document.querySelector('#book_notes');

            if (bookTitle.value.trim() === '' || bookAuthor.value.trim() === '' || bookPages.value.trim() === '') {
                alert('Please fill in all required fields.');
                event.preventDefault();
                return;
            }

            const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked, bookNotes.value);
            addBookToLibrary(newBook);

            drawBook(newBook);

            bookTitle.value = '';
            bookAuthor.value = '';
            bookPages.value = '';
            bookRead.checked = false;
            bookNotes.value = '';
        });

        const numberInput = document.querySelector("#book_pages");
        const invalidChars = ["-", "+", "e"];

        numberInput.addEventListener("keydown", (e) => {
            if (invalidChars.includes(e.key)) {
                e.preventDefault();
            }
        });
    } else if (formCreated) {
        const arrow = document.querySelector('#arrow');
        arrow.textContent = '◀';
        
        header.removeChild(form);

        formCreated = false;
    }
});
