import React, { Component } from 'react';
import SectionHeader from 'components/SectionHeader';
import CandidateCard from 'components/CandidateCard';
import pyv from 'utils/api/pyv';
import CandidateModal from 'components/CandidateModal';

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

    const candidates = this.state.races.map(rData => {
      return rData.candidates.map(candidate => {
        return (
          <CandidateCard
            key={candidate.candidate.candidateId}
            candidate={candidate}
            displayModal={this.displayModal}
          />
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
          <CandidateModal currentCard={this.state.currentCard} />
        </div>
      </div>
    );
  }
}
export default Candidates;
