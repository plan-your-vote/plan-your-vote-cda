import React, { Component } from 'react';
import SectionHeader from 'components/SectionHeader';
import pyv from 'utils/api/pyv';
import { IMAGE_BASE } from 'utils/image';

class Candidates extends Component {
  _isMounted = false;
  state = {
    races: [],
    candidatesHeader: {
      pageTitle: '',
      pageDescription: ''
    },
    selectedCandidates: []
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadCandidatesApi().then(data => {
      if (this._isMounted) {
        this.setState({
          races: data.races,
          candidatesHeader: {
            pageTitle: data.votingPage.pageTitle,
            pageDescription: data.votingPage.pageDescription,
            pageNum: data.votingPage.pageNumber
          }
        });
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  loadCandidatesApi = async () => {
    // const response = await pyv.get('/api/candidates');
    const response = await pyv.get('/api/races');
    return response.data;
  };

  selectBtn = data => {
    let temp = {};
    temp['candidateId'] = data.candidateId;
    temp['name'] = data.name;
    temp['electionId'] = data.electionId;
    temp['election'] = data.election;
    temp['details'] = data.details;
    temp['organizationId'] = data.organizationId;
    temp['organization'] = data.organization;
    temp['candidateRaces'] = data.candidateRaces;
    temp['contacts'] = data.contacts;

    this.state.selectedCandidates.push(temp);

    localStorage.setItem(
      'selectedCandidateRaces',
      JSON.stringify(this.state.selectedCandidates)
    );
  };

  render() {
    const { candidatesHeader } = this.state;
    const cardStyle = {
      maxWidth: '540px'
    };

    let candidates = this.state.races.map(rData => {
      return rData.candidates.map(cData => {
        return (
        <div className='col-sm-3' key={cData.candidate.candidateId}>
          <div className='card' style={cardStyle}>
            <img
              src={`${IMAGE_BASE}/${cData.candidate.picture}`}
              className='card-img-top'
              alt='...'
            />
            <div className='card-body'>
              <h5 className='card-title'>{cData.candidate.name}</h5>
              {/* <h6 className="card-subtitle mb-2 text-muted">cData.organization</h6> */}
              {/* <h6 className="card-subtitle mb-2 text-muted">cData.position</h6> */}
              {/* <p className='card-text'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p> */}
              <button
                className='btn btn-primary'
                onClick={e => this.selectBtn(cData.candidate)}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      );
      })
    })

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
