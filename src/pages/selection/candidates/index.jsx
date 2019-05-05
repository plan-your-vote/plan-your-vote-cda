import React, { Component } from 'react';
import Table from 'components/Table';
import SectionHeader from 'components/SectionHeader';
import dummyCandidates from 'constants/dummyData/candidates.json';
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
          data
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
    return (
      <div className='container'>
        <div className='row'>
          <SectionHeader
            title={dummyHeader[0].title}
            subtitle={dummyHeader[0].subtitle}
            level='2'
            description={dummyHeader[0].description}
          />
          {/* <Table head={dummyCandidates.head} body={dummyCandidates.name} /> */}
        </div>
      </div>
    );
  }
}
export default Candidates;