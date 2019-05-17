import React, { Component } from 'react';
import SectionHeader from 'components/SectionHeader';
import CandidateCard from 'components/CandidateCard';
import CandidateModal from 'components/CandidateModal';
import CandidateSection from 'components/CandidateSectionHeader';
import pyv from 'apis/pyv';
import { Link } from 'react-router-dom';
import * as routes from 'constants/routes';

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

  selectBtn = data => event => {
    const { selectedCandidates } = this.state;
    const newCandidates = selectedCandidates.slice(0);
    const found = selectedCandidates.findIndex(cand => cand.candidateId === data.candidateId);

    if (found > -1) {
      newCandidates.splice(found, 1);
    } else {
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

      newCandidates.push(temp);
    }

    this.setState({ selectedCandidates: newCandidates }, () => {
      if (found > -1) {
        sessionStorage.removeItem('selectedCandidateRaces');
      }
      sessionStorage.setItem(
        'selectedCandidateRaces',
        JSON.stringify(newCandidates)
      );
    });
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
    const { selectedCandidates } = this.state;
    return this.state.races.map(race => {
      return race.candidates.map(candidate => {
        return (
          <CandidateModal
            key={candidate.candidateId}
            candidate={candidate}
            selectFunction={this.selectBtn}
            selectedCandidates={selectedCandidates}
          />
        );
      });
    });
  };

  render() {
    const { candidatesHeader } = this.state;

    const canPositionList = [
      'Mayor',
      'Councillor',
      'School trustee',
      'Park Board commissioner'
    ];

    const candidates =
      this.state.races.length === 0
        ? null
        : canPositionList.map(can => {
            let found = this.state.races.find(pos => pos.positionName === can);
            return (
              <div className='row' key={found.positionName}>
                <div className='col-12'>
                  <h2 key={found.numberNeeded}>
                    <span className='candidateTitle'>{found.positionName}</span>
                  </h2>
                  <CandidateSection
                    key={found.positionName}
                    candidatePosition={found.positionName}
                  />
                </div>

                {this.renderCandidates(found)}
              </div>
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
        </div>
        {candidates}
        {this.renderModal()}
        <br />
        <Link to={routes.CAPITAL} className='btn btn-primary  nextBtn'>
          NEXT
        </Link>
        <br />
        <br />
      </div>
    );
  }
}
export default Candidates;
