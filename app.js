// Book constructor
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;

	}
}

// UI constructor
class UI {
	addBook(book){
		const list = document.getElementById('book-list');
		const row = document.createElement('tr');
		row.innerHTML = `
		 <td>${book.title}</td>
		 <td>${book.author}</td>
		 <td>${book.isbn}</td>
		 <td><a href="#" class="delete">X</a></td>
		 `
		list.appendChild(row);

	}
	deleteBook(book){
			book.parentElement.parentElement.remove();

		
	
			 

		
	}

	clearFields(){
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = '';
	}
	showAlert(message, className){
		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		const div = document.createElement('div');
		div.className = `alert ${className}`;
		div.appendChild(document.createTextNode(message));
		container.insertBefore(div, form);
		setTimeout(function(){
			document.querySelector('.alert').remove();
		}, 3000) 


	}


}

// Local Storage

class Store {
	static getBooks(){
		let books;
		if(localStorage.getItem('books') === null){
			books = [];

		}else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;

	}
	static displayBooks(){
		const books = Store.getBooks();
		books.forEach(function(book){
			const ui = new UI();
			ui.addBook(book)


		})
	}
	static addBooks(book){
		const books = Store.getBooks();
		books.push(book)

	    localStorage.setItem('books', JSON.stringify(books));

	}
	static removeBooks(rm){
		const books = Store.getBooks();
		books.forEach(function(book, index){
			if(book.isbn === rm){
				books.splice(index, 1);

			}
			localStorage.setItem('books', JSON.stringify(books));
			

		})


	}
}

// DOM EVENTS
document.addEventListener('DOMContentLoaded', Store.displayBooks);
// Events


document.getElementById('book-form').addEventListener('submit', function(e){
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const isbn = document.getElementById('isbn').value;
	const book = new Book(title, author, isbn);
	const ui = new UI();
	Store.addBooks(book);
	if(title === '' || author === '' || isbn === ''){
		ui.showAlert('Please fill in all fields!', 'error');
		

	}else {
		ui.addBook(book);
		ui.showAlert('Book Added!', 'success')
		ui.clearFields();


	}
	
	e.preventDefault();
})

document.querySelector('tbody').addEventListener('click', function(e){
      const ui = new UI;
      if(e.target.className === 'delete'){
      	 ui.deleteBook(e.target);
      Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
      ui.showAlert('Book Removed!', 'error');
      }
     
      


	
})

