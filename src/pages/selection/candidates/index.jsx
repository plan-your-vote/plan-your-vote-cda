import React, { Component } from 'react';
import SectionHeader from 'components/SectionHeader';
import CandidateCard from 'components/CandidateCard';
import CandidateModal from 'components/CandidateModal';
import pyv from 'apis/pyv';

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
      candidateId: '',
      name: '',
      picture: '',
      contacts: [
        {
          contactMethod: '',
          contactValue: ''
        }
      ],
      details: [
        {
          title: '',
          text: '',
          format: ''
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
    // console.log(data);
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

  displayModal = candidate => {
    if (this._isMounted) {
      this.setState({
        currentCard: candidate
      });
    } else {
      console.error('unable to set state');
    }
  };

  renderCandidates = race => {
    if (!race) {
      return null;
    }

    return race.candidates.map(candidate => {
      if (!candidate) {
        return null;
      }

      return (
        <CandidateCard
          key={candidate.candidateId}
          candidate={candidate}
          displayModal={this.displayModal}
        />
      );
    });
  };

  renderModal = () => {
    return this.state.races.map(race => {
      return race.candidates.map(candidate => {
        return (
          <CandidateModal
            key={candidate.candidateId}
            candidate={candidate}
            selectFunction={this.selectBtn}
          />
        );
      });
    });
  };

  render() {
    const { candidatesHeader } = this.state;

    const candidates = this.state.races.map(race => {
      return (
        <>
          <p key={race.numberNeeded}>{race.positionName}</p>
          {this.renderCandidates(race)}
        </>
      );
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
          {this.renderModal()}
        </div>
      </div>
    );
  }
}
export default Candidates;
