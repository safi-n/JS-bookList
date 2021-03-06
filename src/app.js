// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() { }
// addBookToList Prototype & Function
UI.prototype.addBookToList = function (book) {
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

// Alert for the validation
UI.prototype.showAlert = function (message, className) {
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

// Delete prototype
UI.prototype.removeBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear the fields after submiting the form function
UI.prototype.clearFields = function () {
  title = document.getElementById('title').value = '',
    author = document.getElementById('author').value = '',
    isbn = document.getElementById('isbn').value = '';
}


// --------------------------------------   EventListener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {

  // get the value of the field
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  // initiate book
  const book = new Book(title, author, isbn);

  // validation of the fields
  if (title === '' || author === '' || isbn === '') {
    // initiate UI
    const ui = new UI();
    ui.showAlert('Please fill out all the fields', 'error')
  } else {
    // initiate UI
    const ui = new UI();
    // add book to the UI
    ui.addBookToList(book);
    // Clear fileds after submiting
    ui.clearFields();
    ui.showAlert('Book added!', 'success')
  }
``
  e.preventDefault();
});

// -------------------------------------   EventListener for Remove book
document.getElementById('book-list').addEventListener('click', function(e) {
  // initiate UI
  const ui = new UI();

  ui.removeBook(e.target);
  e.preventDefault();
});
