import { connect } from 'react-redux';
import * as actions from 'State/book';
import BooksListVirtual from 'Components/BooksLists/BooksListVirtual/BooksListVirtual'

class SearchBookList extends BooksListVirtual {
  state = {
    books: {},
    searchText: ""
  }

  filteredBookList = (allBooks, searchText) => {
    const filteredArray = Object.values(allBooks).filter(book => book.title.includes(searchText))
    return filteredArray.reduce((obj, book) => {
        obj[book.id.toString()] = {...book}
        return obj
      }, {})
  }

  listHeader = "Books"

  getSearchText = (search) => {
    const params = new URLSearchParams(search);
    return params.get('query');
  }

  componentDidUpdate (prevProps, prevState) {
    const searchText = this.getSearchText(this.props.location.search)
    if (searchText !== prevState.searchText) {
      this.setState({
        books: this.filteredBookList(this.props.books, searchText),
        searchText: searchText
      })
    }
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBookList);