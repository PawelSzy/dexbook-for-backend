import React from 'react'
import Book from './Book/Book'

const booksList = (props) => (
  <div className="BooksList" >
    {props.books.map(book => (
      <Book
        key={book.id}
        id={book.id}
        title={book.title}
        author={book.author}
        price={book.price}
        score={book.score}
        rating={book.rating}
        image={book.image} />
    ))}
  </div>
);

export default booksList;