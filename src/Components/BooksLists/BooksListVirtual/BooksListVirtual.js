import React, {Component} from 'react';
import BooksList from 'Components/BooksList/BookList';

class BooksListVirtual extends Component {
  state = {
    books: {},
  }

  filteredBookList = (allBooks, booksId) => {
    return allBooks
  }

  listHeader = ""

  componentDidMount() {
    this.props.loadBooks();
    this.setState({books: this.filteredBookList(this.props.books, Object.keys(this.props.yourBooksRating))})
  }

  render() {
    const showBook = Object.keys(this.state.books).length > 0 && this.state.books.constructor === Object
    return (
      <div className="container">
        <h2>{this.listHeader}</h2>
        { showBook
          ?
          <div className="col-lg-8">
            <BooksList books={this.state.books} />
          </div>
          : null
        }
      </div>
    )
  }
}

export default BooksListVirtual