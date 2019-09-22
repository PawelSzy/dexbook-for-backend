// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './Leaflet.css'

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
  zoom: 15,
}

  render() {
    const markers = this.props.markers
      ? this.props.markers.map(marker => {
      const position = [marker.lat, marker.lng]
      return (
        <Marker position={position}>
          <Popup>
            {marker.text}
          </Popup>
        </Marker>
        )
      })
      : null
  const position = this.props.markers[0] ? [this.props.markers[0].lat, this.props.markers[0].lng] : [this.state.lat, this.state.lng]
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