import { connect } from 'react-redux';
import BooksListVirtual from 'Components/BooksLists/BooksListVirtual/BooksListVirtual'

import * as actions from 'State/book';

class YourBookList extends BooksListVirtual {
  filteredBookList = (allBooks, booksId) => {
    let newBookList = {}
    booksId.forEach(id => newBookList[id] = allBooks[id])
    return newBookList
  }

  listHeader = "Books you rated"

  componentDidUpdate() {
    if (!this.state.wasBooksFiltered) {
      const booksId = [...Object.keys(this.props.yourBooksRating), ...this.props.readedBooks]
      this.setState({
        books: this.filteredBookList(this.props.books, booksId),
        wasBooksFiltered: true
      })
    }
  }
}

const mapStateToProps = state => {
  return {
    yourBooksRating: state.book.yourBooksRating,
    books: state.book.books,
    readedBooks: state.book.readedBooks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: () => dispatch( actions.loadBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourBookList);