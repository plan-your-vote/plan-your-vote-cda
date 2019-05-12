import React, { Component } from 'react';
import SectionHeader from 'components/SectionHeader';
import pyv from 'apis/pyv';
import { CMS_BASE_URL } from 'constants/api';

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
        const { pageTitle, pageDescription, pageNumber } = data.votingPage;

        this.setState({
          races: data.races,
          candidatesHeader: {
            pageTitle: pageTitle,
            pageDescription: pageDescription,
            pageNum: pageNumber
          }
        });
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  loadCandidatesApi = async () => {
    const response = await pyv.get('/api/races');
    return response.data;
  };

  selectBtn = data => {
    const temp = {
      candidateId: data.candidateId,
      name: data.name,
      electionId: data.electionId,
      election: data.election,
      details: data.details,
      organizationId: data.organizationId,
      organization: data.organization,
      candidateRaces: data.candidateRaces,
      contacts: data.contacts
    };

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
                src={`${CMS_BASE_URL}/${cData.candidate.picture}`}
                className='card-img-top'
                alt={cData.candidate.name}
              />
              <div className='card-body'>
                <h5 className='card-title'>{cData.candidate.name}</h5>
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
      });
    });

    return (
      <div className='container'>
        <div className='row'>
          <SectionHeader
            title={candidatesHeader.pageTitle}
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
