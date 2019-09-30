// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './Leaflet.scss'

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

class SimpleExample extends Component <{},
State> {
  state = {
  lat: 54.5144531,
  lng: 18.5236516,
  zoom: 12,
}

  render() {
    const markers = this.props.markers
      ? this.props.markers.map(marker => {
      const position = [marker.lat, marker.lng]
      return (
        <Marker position={position} key={marker.id.toString()} >
          <Popup>
            {marker.text}
          </Popup>
        </Marker>
        )
      })
      : null
    let position = [0,0]
    if (typeof this.props.startPosition !== "undefined"
      && typeof this.props.startPosition.lat !== "undefined"
      && typeof this.props.startPosition.lng !== "undefined"
    ) {
     position = [this.props.startPosition.lat, this.props.startPosition.lng]
    }
    else {
      position = this.props.markers[0] ? [this.props.markers[0].lat, this.props.markers[0].lng] : [this.state.lat, this.state.lng]
    }
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { markers }
      </Map>
    )
  }
}

export default SimpleExample