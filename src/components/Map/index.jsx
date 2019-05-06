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
  }

  render() {
    return <div id='map' style={{ width: '100%', height: '500px' }} />;
  }
}

export default Map;
