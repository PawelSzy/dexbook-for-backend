import React, {Component} from 'react';
import BooksList from 'Components/BooksList/BookList';
import NavColumn from 'Components/NavColumn/NavColumn'

class BooksListVirtual extends Component {
  state = {
    books: {},
    wasBooksFiltered: false
  }

  filteredBookList = (allBooks, booksId) => {
    return allBooks
  }

  listHeader = ""

  componentDidMount() {
    this.props.loadBooks();
  }

  render() {
    const showBook = Object.keys(this.state.books).length > 0 && this.state.books.constructor === Object
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <h2 className="mt-4 text-left">{this.listHeader}</h2>
              { showBook
                ?
                  <div>
                    <BooksList books={this.state.books} />
                  </div>
                : null
              }
          </div>

          <div className="col-lg-4 mt-4">
            <NavColumn />
          </div>
        </div>
      </div>
    )
  }
}

export default BooksListVirtual