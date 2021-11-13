// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI constructors

function UI(){}

UI.prototype.addBookToList = function(book) {
  const list = document.querySelector('#book-list');
  // create Element
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row)
}

UI.prototype.clearFields = function() {
  author = document.querySelector('#title').value = '',
  title = document.querySelector('#author').value = '',
  isbn = document.querySelector('#isbn').value = '';
}

document.getElementById('book-form').addEventListener('submit', function(e) {
  // Declare varivables
  const author = document.querySelector('#title').value,
        title = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
// insantatiate book
  const book = new Book(title, author, isbn);
  // instantiat ui
  const ui = new UI();

  ui.addBookToList(book);

  ui.clearFields();

  e.preventDefault();
});
