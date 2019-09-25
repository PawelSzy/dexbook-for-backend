import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from 'State/book';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import NavColumn from 'Components/NavColumn/NavColumn'

library.add(faCheck)

class Book extends Component {
  componentDidMount() {
    this.props.loadBooks();
  }

  render() {
    if (Object.keys(this.props.books).length === 0 && this.props.books.constructor === Object) {
      return <div></div>
    }
    const url_array = this.props.location.pathname.split('/') // Split the string into an array with / as separator
    const id = url_array[2];
    const isBookMarkedToRead = this.props.wantToReadBooks.includes(Number(id))
    const yourBookRating = id in this.props.yourBooksRating ? this.props.yourBooksRating[id] : 0
    const book = this.props.books[id]
    return (
      <div className="Container">
      <div className="book col-md-10 border-top row">
        <div className="row col-md-8">
          <div className="col-md-4 pl-0 mt-1 mb-5">
            <img className="img-fluid" src={book.image} alt="book cover {book.title}" />
            </div>

          <div className="col-md-6 text-md-left">
            <div className="book__title">{book.title}</div>
            <div className="book__author">{book.author}</div>

            <div className="book__rating"><Rater rating={book.rating} total={5} interactive={false} /></div>
            <div className="row col-md-6 pl-0 book__smaller-text mx-auto mx-md-0">
            <div className="book__price col-md-6 px-0">price: {book.price}</div>
            <div className="book__score col-md-6">score: {book.score}</div>
            </div>
            </div>

          <div className="col-md-5 my-auto text-left pl-0 my-4">
            <div>
            {
            (!isBookMarkedToRead)
            ?
            <Button variant="primary" size="sm" onClick={() => this.props.readLater(book.id)}>
            Want to read
            </Button>
            :
            <Button variant="success" size="sm" onClick={() => this.props.deleteFromReadLater(book.id)}>
            <FontAwesomeIcon icon={faCheck} className="mr-2" />

            Want to read
            </Button>
            }
            </div>

            <div className="book__mark-to-read book__rating">
            <div className="book__mark-to-read__text text-secondary mt-1">Rate this book</div>
            <Rater rating={Math.round(yourBookRating)} total={5} onRate={(rating) => this.props.rateBook(rating, book.id)} />
            </div>
            </div>
        </div>
        <div className="col-md-4 mt-4">
          <NavColumn />
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    yourBooksRating: state.book.yourBooksRating,
    wantToReadBooks: state.book.wantToRead,
    books: state.book.books,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: () => dispatch( actions.loadBooks()),
    readLater: (bookId) => dispatch( actions.readLaterBook(bookId)),
    deleteFromReadLater: bookId => dispatch(actions.removeReadLaterBook(bookId)),
    rateBook: (rating, bookId) => dispatch(actions.rateBook(rating, bookId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);