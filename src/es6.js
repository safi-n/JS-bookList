// Book Class
class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


class UI{

  addBook(book){
    // get the table element from HTML to assign as a list
    const list = document.getElementById('book-list');
    // create the rows for the table
    const row = document.createElement('tr');
    // insert the data to the row (title and etc..)
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
    list.appendChild(row);
  }

  removeBook(target){
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  showAlert(message, className){
    // create a div the element
    const div = document.createElement('div');
    // add class name to the div
    div.className = `alert ${className}`
    // give the message
    div.appendChild(document.createTextNode(message));
    // Select the container
    const container = document.querySelector('.container');
    // get an element where you want to put your message
    const putMyMsg = document.querySelector('#book-form');
    // add the message before the form element
    container.insertBefore(div, putMyMsg);

    // setTime out of 3 seconds
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  clearFields(){
    document.getElementById('title').value = '',
    document.getElementById('author').value = '',
    document.getElementById('isbn').value = '';
  }

}


// Class Store in LS
class Store{
  static LSgetBooks(book){
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books;
  }

  static LSdisplay() {
    const books = Store.LSgetBooks();
    books.forEach(function(book) {
      const ui = new UI;

      // add books to list
      ui.addBook(book);
    });
  }

  static LSaddBook(book) {
    const books = Store.LSgetBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static LSremoveBooks(isbn) {
    const books = Store.LSgetBooks();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    });
    localStorage.setItem('books', JSON.stringify(books));

  }
}

// --------------------------------------  DOM Event listener
document.addEventListener('DOMContentLoaded', Store.LSdisplay);


// --------------------------------------   EventListener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // get the value of the field
  const title =  document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn =   document.getElementById('isbn').value;

  // initiate book
  const book =   new Book(title, author, isbn);

  // validation of the fields
  if (title === '' || author === '' || isbn === '') {
    // initiate UI
    const ui =   new UI();
    ui.showAlert('Please fill out all the fields', 'error')
  } else {
    // initiate UI
    const ui =   new UI();
    // add book to the UI
    ui.addBook(book);
    // Clear fileds after submiting

    // store book in LS
    Store.LSaddBook(book);

    ui.showAlert('Book added!', 'success')
    ui.clearFields();
  }
  e.preventDefault();
});

// -------------------------------------   EventListener for Remove book
document.getElementById('book-list').addEventListener('click', function (e) {
  // initiate UI
  const ui = new UI();

  ui.removeBook(e.target);

  // remove from LS
  Store.LSremoveBooks(e.target.parentElement.previousElementSibling.textContent)
  ui.showAlert('Book deleted', 'success')
  e.preventDefault();
});
