import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import { MAPBOX } from 'credentials.js';

class Map extends Component {
  map;

  state = {
    markers: []
  };

  componentDidMount() {
    mapboxgl.accessToken = MAPBOX;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-123.1139269, 49.2608838],
      zoom: 12
    });

    this.addMarker(49.2608838, -123.1139269);
    this.addMarker(49.279719, -123.115625);
    this.addMarker(49.2830231, -123.1161401);
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
