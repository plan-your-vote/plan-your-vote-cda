import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import { MAPBOX } from 'credentials.js';
import pyv from 'utils/api/pyv';

class Map extends Component {
  _map;
  _isMounted = false;

  state = {
    pollingStations: [
      {
        additionalInfo: '',
        address: '',
        election: null,
        electionId: 1,
        generalAccessInfo: null,
        latitude: 0,
        longitute: 0, // TODO longitude
        name: '',
        parkingInfo: null,
        pollingStationId: 0,
        washroomInfo: null,
        wheelchairInfo: null
      }
    ],
    markers: []
  };

  componentDidMount() {
    this._isMounted = true;
    mapboxgl.accessToken = MAPBOX;

    this._map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-123.1139269, 49.2608838],
      zoom: 13
    });

    this.loadApiData()
      .then(data => {
        if (this._isMounted) {
          this.setState({
            pollingStations: data.pollingStations
          });
        }
      })
      .then(() => {
        this.renderMarkers();
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadApiData = async () => {
    const response = await pyv.get('/api/PollingStations');
    return response.data;
  };

  renderMarkers = () => {
    this.state.pollingStations.map(pollingStation => {
      return this.addMarker(pollingStation.latitude, pollingStation.longitute);
    });
  };

  addMarker = (latitude, longitude) => {
    const marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(this._map);

    const currentMarkers = this.state.markers;
    currentMarkers.push(marker);

    if (this._isMounted) {
      this.setState({
        markers: currentMarkers
      });
    }
  };

  render() {
    return <div id='map' style={{ width: '100%', height: '500px' }} />;
  }
}

export default Map;
