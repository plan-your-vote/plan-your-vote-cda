import React, { Component } from 'react';
import pyvMap from 'apis/pyvMap';
import pyv from 'apis/pyv';
import Details from './details';
import './locations.css';
import Mapbox from './map';

class Map extends Component {
  _isMounted = false;
  _setDistance = false;

  state = {
    user: {
      latitude: 0,
      longitude: 0
    },
    pollingPlaces: [
      {
        pollingPlaceId: 0,
        address: '',
        pollingPlaceName: '',
        pollingStationName: '',
        advanceOnly: false,
        localArea: '',
        pollingPlaceDates: [
          {
            startTime: '',
            endTime: '',
            pollingDate: ''
          }
        ],
        parkingInfo: '',
        wheelchairInfo: '',
        email: '',
        phone: '',
        latitude: 0,
        longitude: 0
      }
    ]
  };

  componentDidMount() {
    this._isMounted = true;
    this.getUserLocation();
    this.loadPollingPlaces().then(() => {
      this.sortPollingPlacesByDistance();
    });
    this.loadDistance();
  }

  componentDidUpdate() {
    if (!this._setDistance) {
      this.loadDistance();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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
      this.mapDistance(response.data);
    });
  };

  mapDistance = distances => {
    if (
      !distances ||
      this.state.pollingPlaces.length === 0 ||
      distances.length === 0
    ) {
      return;
    }

    const result = [];

    distances.map(distance => {
      const place = this.state.pollingPlaces.find(pollingPlace => {
        return pollingPlace.pollingPlaceId === distance.pollingPlaceID;
      });

      if (place) {
        place['distance'] = distance.distance;
        result.push(place);
      }

      return null;
    });

    if (this._isMounted) {
      this.setState({
        pollingPlaces: result
      });
      this._setDistance = true;
    }
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
          <Mapbox
            pollingPlaces={this.state.pollingPlaces}
            user={this.state.user}
          />
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
