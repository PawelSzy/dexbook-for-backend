import React, {Component} from 'react';
import BooksList from 'Components/BooksList/BookList';

import { connect } from 'react-redux';
import * as actions from 'State/book';

class MainPage extends Component {
  componentDidMount() {
    this.props.loadBooks();
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="col-lg-8">
            <BooksList books={this.props.books}/>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    books: state.book.books
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: () => dispatch( actions.loadBooks()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);