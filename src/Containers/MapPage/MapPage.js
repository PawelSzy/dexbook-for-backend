import React, {Component} from 'react';
import BooksList from 'Components/BooksList/BookList';

import GoogleMapsContainer from 'Components/GoogleMapsContainer/GoogleMapsContainer'
import LeafletMaps from 'Components/LeafletMaps/LeafletMaps'

import { connect } from 'react-redux';
import * as actions from 'State/liblaries';

class MapPage extends Component {
  componentDidMount() {
    this.props.loadLiblaries();
  }

  render() {
    const liblaries = this.props.liblaries.map(liblary => ({...liblary,
      text: "Liblary: " + liblary.liblaryName })
    )
    return (
      <div className="mt-4">
        <LeafletMaps markers={liblaries} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    liblaries: state.liblaries.liblaries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadLiblaries: () => dispatch( actions.loadLiblaries()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);