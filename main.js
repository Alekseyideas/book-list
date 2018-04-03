function Book(title,author,id){
  this.title = title;
  this.author = author;
  this.id = id;
}


function UI(){};

document.getElementById('book-form').addEventListener('submit',function(e){
  e.preventDefault();  
  const title = document.querySelector('.book-title').value;
  const author = document.querySelector('.book-author').value;
  const id = document.querySelector('.book-id').value;

  const book = new Book(title,author,id);

  const ui = new UI();
  ui.addBook(book);
  ui.addToStore(book);
  
});

document.querySelector('.clear').addEventListener('click',clearStore)

document.querySelector('#book-table').addEventListener('click',function(e){
  const ui = new UI();
  ui.deleteBook(e);
});


showBooks();

function showBooks(){

  let books;

  if(localStorage.getItem('books')===null){
    books = [];
  }else{
    books = JSON.parse(localStorage.getItem('books'))
  }


  const table = document.querySelector('#book-table tbody');

  let tr;
  
  books.forEach(book => {
    tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td class="id-book">${book.id}</td>
      <td><span class="delete">X</span></td>
    `;
    table.appendChild(tr);
  });



}


UI.prototype.addBook = function(book){
  const table = document.querySelector('#book-table tbody');

  let tr;
  tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td class="id-book">${book.id}</td>
    <td><span class="delete">X</span></td>
  `;
  table.appendChild(tr);
}
UI.prototype.deleteBook = function(e){
  const ui = new UI();
  if(e.target.className === 'delete'){
    e.target.parentNode.parentNode.remove();
    ui.deleteFromStore(e);
  }
}

UI.prototype.addToStore = function(book){
  let books;

  if(localStorage.getItem('books')===null){
    books = [];
  }else{
    books = JSON.parse(localStorage.getItem('books'))
  }
  books.push({title:book.title,author:book.author,id:book.id});
  localStorage.setItem('books',JSON.stringify(books))
}
UI.prototype.deleteFromStore = function(e){

  const id = e.target.parentNode.parentNode.querySelector('.id-book').textContent;

  let books;

  if(localStorage.getItem('books')===null){
    books = [];
  }else{
    books = JSON.parse(localStorage.getItem('books'))
  }

  books.forEach((book,index) => {
    if(book.id === id){
      books.splice(index,1) 
    }
  });

  localStorage.setItem('books',JSON.stringify(books));

}





function clearStore(){

  const table = document.querySelector('#book-table tbody');
  while(table.firstElementChild){
    table.removeChild(table.firstElementChild);
  }
  localStorage.clear();
}