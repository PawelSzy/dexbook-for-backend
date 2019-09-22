import React, {Component} from 'react';
import BooksList from 'Components/BooksList/BookList';

import GoogleMapsContainer from 'Components/GoogleMapsContainer/GoogleMapsContainer'
import LeafletMaps from 'Components/LeafletMaps/LeafletMaps'

import { connect } from 'react-redux';
import * as actions from 'State/libraries';

class MapPage extends Component {
  componentDidMount() {
    this.props.loadLibraries();
  }

  render() {
    const libraries = this.props.libraries.map(library => ({...library,
      text: "Llibrary: " + library.libraryName })
    )
    return (
      <div className="mt-4">
        <LeafletMaps markers={libraries} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    libraries: state.libraries.libraries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadLibraries: () => dispatch( actions.loadLibraries()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);