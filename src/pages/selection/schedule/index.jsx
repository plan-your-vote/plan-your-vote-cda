import React, { Component } from 'react';
import pyvMap from 'apis/pyvMap';
import pyv from 'apis/pyv';
import Map from 'components/Map';
import SectionHeader from 'components/SectionHeader';
import Details from 'components/Map/Details';
import { Link } from 'react-router-dom';
import * as routes from 'constants/routes';

class Schedule extends Component {
  _isMounted = false;
  _isDistanceFixed = false;

  state = {
    selectedStation: [],
    user: {
      latitude: 0,
      longitude: 0
    },
    allPollingPlaces: [
      {
        pollingPlaceId: 0,
        address: null,
        pollingPlaceName: null,
        pollingStationName: null,
        advanceOnly: false,
        localArea: null,
        pollingPlaceDates: [
          {
            startTime: null,
            endTime: null,
            pollingDate: null
          }
        ],
        parkingInfo: null,
        wheelchairInfo: null,
        email: null,
        phone: null,
        latitude: 0,
        longitude: 0
      }
    ],
    page: {
      title: null,
      description: null
    },
    closePollingPlaces: []
  };

  componentDidMount() {
    this._isMounted = true;
    this.initializeUserCoordinates();
    this.loadPollingPlaces();
    this.loadDistance();
    this.loadPollingHeader();
  }

  componentDidUpdate() {
    if (!this._isDistanceFixed) {
      this.loadDistance();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  initializeUserCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.setUserCoordinates(latitude, longitude);
      });
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  };

  selectStation = data => event => {
    const { selectedStation } = this.state;
    const selectedStationCopy = selectedStation.slice(0);

    const found = selectedStation.findIndex(
      station => station.pollingPlaceId === data.pollingPlaceID
    );
    // console.log(data)
    // console.log(selectedStation)

    const temp = {
      pollingPlaceId: data.pollingPlaceId,
      pollingPlaceName: data.pollingPlaceName,
      address: data.address,
      pollingStationName: data.pollingStationName,
      parkingInfo: data.parkingInfo,
      wheelchairInfo: data.wheelchairInfo,
      advanceOnly: data.advanceOnly,
      localArea: data.localArea,
      phone: data.phone,
      email: data.email,
      latitude: data.latitude,
      longitude: data.longitude,
      pollingPlaceDates: data.pollingPlaceDates
    };

    if (selectedStation.length !== 0) {
      selectedStationCopy.splice(found, 1);
      selectedStationCopy.push(temp);
    } else {
      selectedStationCopy.push(temp)
    }

    this.setState({selectedStation: selectedStationCopy}, () => {
      if (found > -1) {
        sessionStorage.removeItem('pollingPlace')
      }
      sessionStorage.setItem('pollingPlace', JSON.stringify(selectedStationCopy))
    })
  };

  loadPollingHeader = async () => {
    await pyv.get('/api/steps/3').then(response => {
      if (this._isMounted) {
        this.setState({
          page: {
            title: response.data.stepTitle,
            description: response.data.stepDescription
          }
        });
      }
    })
  }

  loadPollingPlaces = async () => {
    await pyv.get('/api/PollingPlaces').then(response => {
      if (this._isMounted) {
        this.setState({
          page: {
            title: response.data.votingPage.pageTitle,
            description: response.data.votingPage.pageDescription
          },
          allPollingPlaces: response.data.pollingPlaces
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
      this.state.allPollingPlaces.length === 0 ||
      distances.length === 0
    ) {
      return;
    }

    const result = [];

    distances.map(distance => {
      const place = this.state.allPollingPlaces.find(pollingPlace => {
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
        closePollingPlaces: result
      });
      this._isDistanceFixed = true;
    }
  };

  setUserCoordinates = (latitude, longitude) => {
    if (this._isMounted) {
      this._isDistanceFixed = false;
      this.setState({
        user: {
          latitude,
          longitude
        }
      });
    }
  };

  render() {
    const details = this.state.closePollingPlaces.map(pollingPlace => {
      return (
        <li className='list-group-item' key={pollingPlace.pollingPlaceId}>
          <Details
            pollingPlace={pollingPlace}
            selectFunction={this.selectStation}
            selectedStation={this.state.selectedStation}
          />
        </li>
      );
    });

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <SectionHeader
              title={this.state.page.title}
              level='2'
              description={this.state.page.description}
            />
            <Link to={routes.CAPITAL} className='btn btn-secondary backBtn'>
              BACK
            </Link>
            <Link to={routes.REVIEW} className='btn btn-secondary nextBtn'>
              NEXT
            </Link>
            <br/><br/>
          </div>
          <div className='col-md-6'>
            <Map
              pollingPlaces={this.state.closePollingPlaces}
              user={this.state.user}
              setUserCoordinates={this.setUserCoordinates}
              _isDistanceFixed={this._isDistanceFixed}
            />
          </div>
          <div className='col-md-6'>
            <ul className='list-group list-group-flush' id='station-list'>
              {details}
            </ul>
          </div>
        </div>
        <Link to={routes.CAPITAL} className='btn btn-secondary backBtn'>
          BACK
        </Link>
        <Link to={routes.REVIEW} className='btn btn-secondary nextBtn'>
          NEXT
        </Link>
      </div>
    );
  }
}

export default Schedule;
