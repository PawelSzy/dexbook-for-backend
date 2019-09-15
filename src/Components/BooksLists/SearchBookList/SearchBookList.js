import { connect } from 'react-redux';
import * as actions from 'State/book';
import BooksListVirtual from 'Components/BooksLists/BooksListVirtual/BooksListVirtual'

class YourBookList extends BooksListVirtual {
  filteredBookList = (allBooks, booksId) => {
    let newBookList = {}
    booksId.forEach(id => newBookList[id] = allBooks[id])
    return newBookList
  }

  listHeader = "Books"
}

const mapStateToProps = state => {
  return {
    books: state.book.books,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: () => dispatch( actions.loadBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourBookList);