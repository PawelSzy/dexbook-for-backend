import React, {Component} from 'react';
import './App.css';

import BooksList from './Components/BooksList/BookList';

class App extends Component {
  render() {
    const booksList = [
      {title: "title", author: "author", id: 1, price: "1$", score: 1000, rating: 4, image: "book_image" },
      {title: "title", author: "author", id: 2, price: "1$", score: 1000, rating: 4, image: "book_image" },
      {title: "title", author: "author", id: 3, price: "1$", score: 1000, rating: 4, image: "book_image" },
      {title: "title", author: "author", id: 4, price: "1$", score: 1000, rating: 4, image: "book_image" },
      {title: "title", author: "author", id: 5, price: "1$", score: 1000, rating: 4, image: "book_image" },
      {title: "title", author: "author", id: 6, price: "1$", score: 1000, rating: 4, image: "book_image" },
    ]
    return (
      <div className="App">
        <BooksList books={booksList}/>
      </div>
    );
  }
}

export default App;
