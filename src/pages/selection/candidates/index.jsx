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
    selectedCandidates: [],
    currentCard: {
      candidate: {
        name: '',
        candidateId: '',
        candidateRaces: '',
        contacts: '',
        details: '',
        election: '',
        electionId: '',
        organization: '',
        organizationId: '',
        picture: ''
      },
      contacts: [],
      details: [
        {
          id: '',
          candidateId: '',
          candidate: '',
          title: '',
          text: '',
          format: '',
          lang: ''
        }
      ]
    }
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

  displayModal = data => {
    console.log(data);
    if (this._isMounted) {
      this.setState({
        currentCard: data
      });
    } else {
      console.error('unable to set state');
    }
  };

  render() {
    console.log(this.state.currentCard.details);
    const { candidatesHeader } = this.state;
    const cardStyle = {
      maxWidth: '540px'
    };

    let candidates = this.state.races.map(rData => {
      return rData.candidates.map(cData => {
        return (
          <div className='col-sm-3' key={cData.candidate.candidateId}>
            <div
              className='card'
              onClick={e => this.displayModal(cData)}
              style={cardStyle}
              data-toggle='modal'
              data-target='#exampleModal'
            >
              <img
                src={`${IMAGE_BASE}/${cData.candidate.picture}`}
                className='card-img-top'
                alt={cData.candidate.name}
              />
              <div className='card-body'>
                <h5 className='card-title'>{cData.candidate.name}</h5>
              </div>
            </div>
            {/* <!-- Modal --> */}
            <div
              className='modal fade'
              id='exampleModal'
              tabIndex='-1'
              role='dialog'
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'
            >
              <div
                className='modal-dialog modal-dialog-centered'
                role='document'
              >
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalLabel'>
                      {this.state.currentCard.candidate.name}
                    </h5>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Close'
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <img
                      src={`${IMAGE_BASE}/${
                        this.state.currentCard.candidate.picture
                      }`}
                      className='card-img-top'
                      alt={cData.candidate.name}
                    />
                    <br />
                    Candidate ID:{' '}
                    {this.state.currentCard.candidate.candidateId}
                    <br />
                    Top 3 Priorities:
                    <br />
                    1. {this.state.currentCard.details[0].text}
                    {/* 1. {this.state.currentCard.details[0].text} */}
                    {/* 1. {this.state.currentCard.details[0].text} */}
                  </div>
                  <div className='modal-footer'>
                    {/* <button
                      className='btn btn-primary'
                      onClick={e => this.selectBtn(cData.candidate)}
                    >
                      Select
                    </button> */}
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-dismiss='modal'
                    >
                      Close
                    </button>
                    <button type='button' className='btn btn-primary'>
                      Save changes
                    </button>
                  </div>
                </div>
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
