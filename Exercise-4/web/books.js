document.addEventListener("DOMContentLoaded", _ => {
  const url = "http://localhost:3000/books/all";
  const wrapper = document.getElementById('books');
  fetchBooks(url)
  .then(books => showBooks(books, wrapper))
  .catch(_ => showBooks([], wrapper));
});

function fetchBooks(url) {
  return fetch(url, { method: 'GET' })
    .then(response => response.json());
}

function showBooks(books, wrapper) {
  if (books.length >= 1) {
    let listElement = document.createElement('ul');

    for (var i=0; i<books.length; i++) {
      const book = books[i];

      let listingElement = document.createElement('li');
      let paragraphElement = document.createElement('p');

      let titleElement = document.createElement('strong');
      let title = `${book.title} (${book.genre})`;
      titleTextNode = document.createTextNode(title);
      titleElement.appendChild(titleTextNode);
      paragraphElement.appendChild(titleElement);

      let authorTextNode = document.createTextNode(` by ${book.author}`);
      paragraphElement.appendChild(authorTextNode);

      listingElement.appendChild(paragraphElement);
      listElement.appendChild(listingElement);
    }

    wrapper.appendChild(listElement);
  } else {
    let emptyParagraph = document.createElement('strong');
    let emptyText = document.createTextNode('No books available');
    emptyParagraph.appendChild(emptyText);
    wrapper.appendChild(emptyParagraph);
  }
}
