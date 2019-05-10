import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import { MAPBOX } from 'credentials.js';
import pyv from 'utils/api/pyv';
import mapboxDistance from 'utils/api/mapboxDistance';
import Details from './details';
import './locations.css';

mapboxgl.accessToken = MAPBOX;

class Map extends Component {
  _map;
  _isMounted = false;

  state = {
    user: {
      latitude: 0,
      longitude: 0
    },
    pollingStations: [
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
        pollingStationId: 0,
        washroomInfo: null,
        wheelchairInfo: null,
        distance: 0
      }
    ],
    markers: []
  };

  componentDidMount() {
    this._isMounted = true;

    this._map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 13
    });

    this.loadApiData().then(() => {
      this.sortPollingStationsByDistance();
      this.renderMarkers();
    });

    this.getUserLocation();
    this.flyToClickedLocation();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadApiData = async () => {
    await pyv.get('/api/PollingStations').then(response => {
      if (this._isMounted) {
        this.setState({
          pollingStations: response.data.pollingStations
        });
      }
    });
  };

  getDistance = async (latitude, longitude) => {
    const result = await mapboxDistance.get(
      `${longitude},${latitude};${this.state.user.longitude},${
        this.state.user.latitude
      }`,
      {
        params: {
          access_token: MAPBOX
        }
      }
    );

    return result.data.routes[0].distance;
  };

  sortPollingStationsByDistance = () => {
    const stations = this.state.pollingStations;

    stations.forEach(pollingStation => {
      this.getDistance(pollingStation.latitude, pollingStation.longitude)
        .then(distance => {
          pollingStation['distance'] = distance;
        })
        .then(() => {
          stations.sort((a, b) => {
            return a.distance - b.distance;
          });

          if (this._isMounted) {
            this.setState({
              pollingStations: stations
            });
          }
        });
    });
  };

  renderMarkers = () => {
    this.state.pollingStations.map(pollingStation => {
      return this.addMarker(pollingStation);
    });
  };

  addMarker = pollingStation => {
    const marker = new mapboxgl.Marker()
      .setLngLat([pollingStation.longitude, pollingStation.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<strong>${pollingStation.name}</strong><p>${
            pollingStation.address
          }</p>`
        )
      )
      .addTo(this._map);

    const currentMarkers = this.state.markers;
    currentMarkers.push(marker);

    if (this._isMounted) {
      this.setState({
        markers: currentMarkers
      });
    }
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

          this._map.setCenter([longitude, latitude]);
        }
      });
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  };

  render() {
    const details = this.state.pollingStations.map(pollingStation => {
      return (
        <li className='list-group-item' key={pollingStation.pollingStationId}>
          <Details pollingStation={pollingStation} />
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
