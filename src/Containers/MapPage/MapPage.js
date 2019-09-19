import React, {Component} from 'react';
import BooksList from 'Components/BooksList/BookList';

import GoogleMapsContainer from 'Components/GoogleMapsContainer/GoogleMapsContainer'

import { connect } from 'react-redux';
import * as actions from 'State/book';

class MapPage extends Component {
  componentDidMount() {
    this.props.loadBooks();
  }

  render() {
    return (
      <div className="mt-4">
        <GoogleMapsContainer />
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

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);