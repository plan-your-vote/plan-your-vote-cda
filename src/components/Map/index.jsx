import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_PUBLIC } from 'constants/mapbox';
import pyvMap from 'apis/pyvMap';
import pyv from 'apis/pyv';
import Details from './details';
import './locations.css';

mapboxgl.accessToken = MAPBOX_PUBLIC;

class Map extends Component {
  _map;
  _isMounted = false;

  state = {
    user: {
      latitude: 0,
      longitude: 0
    },
    pollingPlaces: [
      {
        additionalInfo: '',
        address: '',
        election: null,
        electionId: 0,
        generalAccessInfo: null,
        latitude: 0,
        longitude: 0,
        name: '',
        parkingInfo: null,
        pollingPlaceId: 0,
        washroomInfo: null,
        wheelchairInfo: null,
        distance: 0
      }
    ],
    locations: [],
    
  };

  componentDidMount() {
    this._isMounted = true;
    this.initializeMap();
    this.getUserLocation();
    this.loadPollingPlaces().then(() => {
      this.sortPollingPlacesByDistance();
      this.renderMarkers();
    });
  }

  componentDidUpdate() {
    this.setMapCenter();
    this.loadDistance();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  initializeMap = () => {
    this._map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 13
    });
    this.flyToClickedLocation();
  };

  flyToClickedLocation = () => {
    this._map.on('click', e => {
      this._map.flyTo({ center: e.lngLat, speed: 0.25 });
    });
  };

  getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        if (this._isMounted) {
          this.setState({
            user: {
              latitude,
              longitude
            }
          });
        }
      });
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  };

  setMapCenter = () => {
    const { latitude, longitude } = this.state.user;
    this._map.setCenter([longitude, latitude]);
  };

  loadPollingPlaces = async () => {
    await pyv.get('/api/PollingPlaces').then(response => {
      if (this._isMounted) {
        this.setState({
          pollingPlaces: response.data.pollingPlaces
        });
      }
    });
  };

  loadDistance = async () => {
    const { latitude, longitude } = this.state.user;
    if (latitude === 0 && longitude === 0) {
      return;
    }

    await pyvMap.get(`/api/map/${longitude},${latitude}`).then(response => {
      if (this._isMounted) {
        this.setState({
          locations: response.data
        });
      }
    });
  };

  sortPollingPlacesByDistance = () => {
    const stations = this.state.pollingPlaces;

    if (stations[0].latitude === 0 && stations[0].longitude === 0) {
      return;
    }

    stations.sort((a, b) => {
      return a.distance - b.distance;
    });

    if (this._isMounted) {
      this.setState({
        pollingPlaces: stations
      });
    }
  };

  renderMarkers = () => {
    this.state.pollingPlaces.map(pollingPlace => {
      return this.addMarker(pollingPlace);
    });
  };

  addMarker = pollingPlace => {
    new mapboxgl.Marker()
      .setLngLat([pollingPlace.longitude, pollingPlace.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<strong>${pollingPlace.name}</strong><p>${pollingPlace.address}</p>`
        )
      )
      .addTo(this._map);
  };

  render() {
    const details = this.state.pollingPlaces.map(pollingPlace => {
      return (
        <li className='list-group-item' key={pollingPlace.pollingPlaceId}>
          <Details pollingPlace={pollingPlace} />
        </li>
      );
    });

    return (
      <>
        <div className='col-md-6'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <label className='input-group-text' htmlFor='votingdate'>
                <i className='far fa-calendar-check' />
              </label>
            </div>
            <select className='custom-select form-control-sm' id='votingdate'>
              <option value='May 12, 2019'>May 12, 2019</option>
              <option value='May 13, 2019'>May 13, 2019</option>
              <option value='May 14, 2019'>May 14, 2019</option>
              <option value='May 15, 2019'>May 15, 2019</option>
            </select>
          </div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                <i className='fas fa-map-marker-alt' />
              </span>
            </div>
            <input
              type='text'
              name='location'
              className='form-control'
              placeholder='123 Awesome st'
              aria-label='Your Location'
            />
          </div>
          <div id='map' />
        </div>
        <div className='col-md-6'>
          <ul className='list-group list-group-flush' id='station-list'>
            {details}
          </ul>
        </div>
      </>
    );
  }
}

export default Map;
