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
}

const mapStateToProps = state => {
  return {
    yourBooksRating: state.book.yourBooksRating,
    books: state.book.books,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: () => dispatch( actions.loadBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourBookList);