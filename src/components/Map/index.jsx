import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import { MAPBOX } from 'credentials.js';

class Map extends Component {
  map;

  componentDidMount() {
    mapboxgl.accessToken = MAPBOX;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-123.1139269, 49.2608838],
      zoom: 12
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([-123.115625, 49.279719])
      .addTo(this.map);
  }

  render() {
    return <div id='map' style={{ width: '100%', height: '500px' }} />;
  }
}

export default Map;
