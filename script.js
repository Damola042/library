class BookLibrary {
    constructor() {
        this.books = JSON.parse(localStorage.getItem('bookLibrary')) || [];
        this.initializeDOM();
        this.renderBooks();
    }


    initializeDOM() {
        this.bookForm = document.getElementById('bookForm');
        this.bookList = document.getElementById('bookList');
        this.bookCount = document.getElementById('bookCount');


        this.bookForm.addEventListener('submit', this.addBook.bind(this));
    }


    saveToLocalStorage() {
        localStorage.setItem('bookLibrary', JSON.stringify(this.books));
    }


    addBook(e) {
        e.preventDefault();


        const book = {
            id: Date.now(),
            title: document.getElementById('bookTitle').value,
            author: document.getElementById('bookAuthor').value,
            genre: document.getElementById('bookGenre').value,
            year: document.getElementById('bookYear').value,
            isRead: false,
            dateAdded: new Date().toLocaleDateString()
        };


        this.books.push(book);
        this.saveToLocalStorage();
        this.renderBooks();
        this.bookForm.reset();
    }


    renderBooks() {
        this.bookList.innerHTML = '';


        this.books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            if (book.isRead) bookItem.classList.add('read-book');


            bookItem.innerHTML = `
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>
                        ${book.author}
                        ${book.genre ? `· ${book.genre}` : ''}
                        ${book.year ? `· ${book.year}` : ''}
                    </p>
                    <small>Added: ${book.dateAdded}</small>
                </div>
                <div class="book-actions">
                    <button class="btn btn-read" data-id="${book.id}">
                        ${book.isRead ? 'Unmark' : 'Mark'} Read
                    </button>
                    <button class="btn btn-delete" data-id="${book.id}">Delete</button>
                </div>
            `;


            const readBtn = bookItem.querySelector('.btn-read');
            const deleteBtn = bookItem.querySelector('.btn-delete');


            readBtn.addEventListener('click', () => this.toggleReadStatus(book.id));
            deleteBtn.addEventListener('click', () => this.deleteBook(book.id));


            this.bookList.appendChild(bookItem);
        });


        this.updateBookCount();
    }


    updateBookCount() {
        const totalBooks = this.books.length;
        const readBooks = this.books.filter(b => b.isRead).length;
        this.bookCount.textContent = `${totalBooks} Books (${readBooks} Read)`;
    }


    toggleReadStatus(id) {
        const book = this.books.find(b => b.id === id);
        if (book) {
            book.isRead = !book.isRead;
            this.saveToLocalStorage();
            this.renderBooks();
        }
    }


    deleteBook(id) {
        this.books = this.books.filter(book => book.id !== id);
        this.saveToLocalStorage();
        this.renderBooks();
    }
}


const bookLibrary = new BookLibrary();
