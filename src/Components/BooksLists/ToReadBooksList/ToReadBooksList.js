import { connect } from 'react-redux';
import * as actions from 'State/book';
import BooksListVirtual from 'Components/BooksLists/BooksListVirtual/BooksListVirtual'

class toReadBooksList extends BooksListVirtual {
  filteredBookList = (allBooks, booksId) => {
    let newBookList = {}
    booksId.forEach(id => newBookList[id] = allBooks[id])
    return newBookList
  }

  listHeader = "Books you want to read"

  componentDidMount() {
    this.props.loadBooks()
    this.setState({books: this.filteredBookList(this.props.books, this.props.readedBooks)})
  }
}

const mapStateToProps = state => {
  return {
    readedBooks: state.book.wantToRead,
    books: state.book.books,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: () => dispatch( actions.loadBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toReadBooksList);