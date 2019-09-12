import React from 'react'
import Book from './Book/Book'

const booksList = (props) => (
  <div className="BooksList border-bottom mb-2">

    {Object.keys(props.books).map(id => (
      <Book
        key={id}
        id={id}
        title={props.books[id].title}
        author={props.books[id].author}
        price={props.books[id].price}
        score={props.books[id].score}
        rating={props.books[id].rating}
        image={props.books[id].image} />
    ))}
  </div>
);

export default booksList;