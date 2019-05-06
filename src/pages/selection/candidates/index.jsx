import React, { Component } from 'react';
import Table from 'components/Table';
import SectionHeader from 'components/SectionHeader';
import dummyHeader from 'constants/dummyData/pages.json';
import pyv from 'utils/api/pyv';


class Candidates extends Component {
  _isMounted = false;
  state = {
    candidates: []
  };
  componentDidMount() {
    this._isMounted = true;
    this.loadCandidatesApi().then(data => {
      if (this._isMounted) {
        this.setState({
          candidates:data
        });
      }
    });
    console.log(this.state.candidates);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  loadCandidatesApi = async () => {
    const response = await pyv.get('/candidates');
    const data = response.data;
    return data;
  };
  render() {
    const cardStyle = {
      'maxWidth': '540px'
    };

    let candidate = this.state.candidates.map(cData => {
      return (
        <div className='col-sm-3'>
            <div className="card" style={cardStyle}>
              <img src={cData.picture} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{cData.name}</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">cData.organization</h6> */}
                {/* <h6 className="card-subtitle mb-2 text-muted">cData.position</h6> */}
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
      );
    });

    return (
      <div className='container'>
        <div className='row'>
          <SectionHeader
            title={dummyHeader[0].title}
            subtitle={dummyHeader[0].subtitle}
            level='2'
            description={dummyHeader[0].description}
          />
          {candidate}
        </div>
      </div>
    );
  }
}
export default Candidates;
