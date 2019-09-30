import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from 'State/book';

const bookFormButton = (props) => {
  const bookId = props.id
  const WANT_TO_READ = "Want to read"
  const READED = "Readed"
  const bookSelectOption = (event, bookId) => {
    const chosenOption = event.target.value
    if( chosenOption === WANT_TO_READ ) {
      props.readLater(bookId)
    }
    if (chosenOption === READED) {
      props.addBookToReaded(bookId)
    }
  }


  return (
    <>
      <Button className="book__button" variant="primary" size="sm" onClick={() => props.readLater(bookId)}>
            { WANT_TO_READ }
      </Button>

      <Form className="d-inline">
        <Form.Group controlId="exampleForm.ControlSelect1" className="d-inline">
          <Form.Control
            className="btn-primary d-inline book__button__form"
            as="select"
            onChange={(e) => bookSelectOption(e, bookId)} >
            <option>
            </option>

            <option>
              { WANT_TO_READ }
            </option>

            <option>
              { READED }
            </option>
          </Form.Control>
        </Form.Group>
      </Form>
    </>
  )
}

const mapStateToProps = state => {
  return {
    wantToReadBooks: state.book.wantToRead,
    booksRating: state.book.yourBooksRating,
    readedBooks: state.book.readedBooks,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    readLater: bookId => dispatch( actions.readLaterBook(bookId)),
    deleteFromReadLater: bookId => dispatch(actions.removeReadLaterBook(bookId)),
    rateBook: (rating, bookId) => dispatch(actions.rateBook(rating, bookId)),
    addBookToReaded: bookId => dispatch(actions.addBookToReaded(bookId)),
    removeBookFromReaded: bookId => dispatch(actions.removeBookFromReaded(bookId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(bookFormButton)