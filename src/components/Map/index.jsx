import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import { MAPBOX } from 'credentials.js';
import coordinates from 'constants/coordinates.json';

class Map extends Component {
  map;

  state = {
    markers: []
  };

  componentDidMount() {
    mapboxgl.accessToken = MAPBOX;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-123.1139269, 49.2608838],
      zoom: 13
    });

    coordinates.map(address => {
      return this.addMarker(address.latitude, address.longitude);
    });
  }

  addMarker = (latitude, longitude) => {
    const marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(this.map);

    const currentMarkers = this.state.markers;
    currentMarkers.push(marker);

    this.setState({
      markers: currentMarkers
    });
  };

  render() {
    return <div id='map' style={{ width: '100%', height: '500px' }} />;
  }
}

export default Map;
