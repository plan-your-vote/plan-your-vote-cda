import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MAPBOX_PUBLIC } from 'constants/mapbox';
import './locations.css';

mapboxgl.accessToken = MAPBOX_PUBLIC;

class Map extends Component {
  _map;
  _geocoder;
  _isMounted = false;
  _markers = [];

  componentDidMount() {
    this._isMounted = true;
    this.init();
    this.flyToClickedLocation();
    this.setMapCenter();
    this.renderMarkers();
  }

  componentDidUpdate() {
    this.setMapCenter();
    this.renderMarkers();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  init = () => {
    this._map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 13
    });

    this._geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });

    this._geocoder.on('result', e => {
      const latitude = e.result.geometry.coordinates[1];
      const longitude = e.result.geometry.coordinates[0];
      this.props.setUserCoordinates(latitude, longitude);
    });

    document
      .getElementById('geocoder')
      .appendChild(this._geocoder.onAdd(this._map));
  };

  flyToClickedLocation = () => {
    this._map.on('click', e => {
      this._map.flyTo({ center: e.lngLat, speed: 0.25 });
    });
  };

  renderMarkers = () => {
    this.clearAllMarkers();
    this.props.pollingPlaces.map(pollingPlace => {
      return this.addMarker(pollingPlace);
    });
  };

  clearAllMarkers = () => {
    this._markers.map(marker => {
      return marker.remove();
    });
  };

  setMapCenter = () => {
    if (!this.props.user || this.props._isDistanceFixed) {
      return;
    }
    const { latitude, longitude } = this.props.user;
    this._map.setCenter([longitude, latitude]);
  };

  addMarker = pollingPlace => {
    const marker = new mapboxgl.Marker()
      .setLngLat([pollingPlace.longitude, pollingPlace.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<strong>${pollingPlace.pollingPlaceName}</strong><p>${
            pollingPlace.address
          }</p>`
        )
      )
      .addTo(this._map);
    this._markers.push(marker);
  };

  render() {
    return (
      <>
        <div id='geocoder' />
        <div id='map' />
      </>
    );
  }
}

export default Map;
