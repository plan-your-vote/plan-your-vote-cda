import React, { Component } from 'react';
import SectionHeader from 'components/SectionHeader';
import pyv from 'utils/api/pyv';
import {IMAGE_BASE} from 'utils/image';

class Candidates extends Component {
  _isMounted = false;
  state = {
    candidates: [],
    candidatesHeader: {
      pageTitle: '',
      pageDescription: ''
    }
  };
  componentDidMount() {
    this._isMounted = true;
    this.loadCandidatesApi().then(data => {
      if (this._isMounted) {
        this.setState({
          candidates: data[0], 
          candidatesHeader: {
            pageTitle: data[1].votingPage.pageTitle,
            pageDescription: data[1].votingPage.pageDescription,
            pageNum: data[1].votingPage.pageNumber
          }
        });
      }
    }
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  loadCandidatesApi = async () => {
    const response = await pyv.get('/api/candidates');
    const response2 = await pyv.get('/api/races'); 
    return [response.data, response2.data];
  };

  render() {
    const {candidatesHeader} = this.state
    const cardStyle = {
      maxWidth: '540px'
    };


    let candidates = this.state.candidates.map(cData => {
      return (
        <div className='col-sm-3' key={cData.candidateId}>
          <div className='card' style={cardStyle}>
            <img src={`${IMAGE_BASE}/${cData.picture}`} className='card-img-top' alt='...' />
            <div className='card-body'>
              <h5 className='card-title'>{cData.name}</h5>
              {/* <h6 className="card-subtitle mb-2 text-muted">cData.organization</h6> */}
              {/* <h6 className="card-subtitle mb-2 text-muted">cData.position</h6> */}
              {/* <p className='card-text'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p> */}
              <a href='#' className='btn btn-primary'>
                Select
              </a>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='container'>
        <div className='row'>
          <SectionHeader
            title={candidatesHeader.pageTitle} 
            subtitle=''
            level='2'
            description={candidatesHeader.pageDescription}
          />
          {candidates}
        </div>
      </div>
    );
  }
}
export default Candidates;
