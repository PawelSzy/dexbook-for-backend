import React, {Component} from 'react';
import GoogleMapsContainer from 'Components/GoogleMapsContainer/GoogleMapsContainer'
import LeafletMaps from 'Components/LeafletMaps/LeafletMaps'

import { connect } from 'react-redux';
import * as actions from 'State/libraries';

class MapPage extends Component {
  state = {
    userPosition: {
      lat: 54.5144531,
      lng: 18.5236516,
    }
  }
  componentDidMount() {
    this.props.loadLibraries();
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userPosition: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })
    })
  }

  render() {
    const libraries = this.props.libraries.map(library => ({...library,
      text: "Llibrary: " + library.libraryName })
    )
    return (
      <div className="mt-4">
        <h3 className="text-secondary">In demo only libraries in Gdynia</h3>
        <LeafletMaps markers={libraries} startPosition={this.state.userPosition} />
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