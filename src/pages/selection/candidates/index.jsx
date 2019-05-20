import React, { Component } from 'react';
import SectionHeader from 'components/SectionHeader';
import CandidateCard from 'components/CandidateCard';
import CandidateModal from 'components/CandidateModal';
import CandidateSection from 'components/CandidateSectionHeader';
import pyv from 'apis/pyv';
import { Link } from 'react-router-dom';
import * as routes from 'constants/routes';
import CandidatesCount from 'components/TotalCandidates';

class Candidates extends Component {
  _isMounted = false;

  state = {
    races: [],
    candidatesHeader: {
      stepTitle: '',
      stepDescription: ''
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
    },
    sortOption: ''
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadCandidatesApi().then(response => {
      if (this._isMounted) {
        const { stepTitle, stepDescription, stepNumber } = response.step;
        this.setState({
          races: response.races.races,
          candidatesHeader: {
            stepTitle,
            stepDescription,
            stepNumber
          }
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadCandidatesApi = async () => {
    const races = await pyv.get('/api/races');
    const step = await pyv.get('/api/steps/1');
    const data = { races: races.data, step: step.data };
    return data;
  };

  selectBtn = (position, candidate) => event => {
    const { selectedCandidates } = this.state;
    const newCandidates = selectedCandidates.slice(0);
    const found = selectedCandidates.findIndex(
      cand => cand.candidateId === candidate.candidateId
    );

    if (found > -1) {
      newCandidates.splice(found, 1);
    } else {
      const temp = {
        candidateId: candidate.candidateId,
        name: candidate.name,
        picture: candidate.picture,
        candidatePosition: position,
        details: candidate.details,
        organizationName: candidate.organizationName,
        contacts: candidate.contacts
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
            position={race.positionName}
            candidate={candidate}
            selectFunction={this.selectBtn}
            selectedCandidates={selectedCandidates}
          />
        );
      });
    });
  };

  sortCandidates = e => {
    if (this._isMounted) {
      this.setState({
        sortOption: e.target.value
      });
    }

    let races = this.state.races;

    if (e.target.value === 'ballot-order') {
      for (const race of races) {
        race.candidates.sort((a, b) => {
          return a.ballotOrder - b.ballotOrder;
        });
      }
    } else if (e.target.value === 'asc') {
      for (const race of races) {
        race.candidates.sort(this.sortByNameAsc);
      }
    } else if (e.target.value === 'desc') {
      for (const race of races) {
        race.candidates.sort(this.sortByNameDesc);
      }
    }

    if (this._isMounted) {
      this.setState({
        races
      });
    }
  };

  sortByNameAsc = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  sortByNameDesc = (a, b) => {
    if (a.name < b.name) {
      return 1;
    }
    if (a.name > b.name) {
      return -1;
    }
    return 0;
  };

  render() {
    const { candidatesHeader } = this.state;
    const { selectedCandidates } = this.state;

    const positions = [];
    this.state.races.forEach(race => {
      positions.push(race.positionName);
    });

    const candidates =
      this.state.races.length === 0
        ? null
        : positions.map(can => {
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
                    races={this.state.races}
                  />
                </div>

                {this.renderCandidates(found)}
              </div>
            );
          });

    const positionsSummary = [];
    this.state.races.forEach(race => {
      positionsSummary.push({
        positionName: race.positionName,
        numberNeeded: race.numberNeeded
      });
    });

    return (
      <div className='container'>
        <div className='canTable'>
          <CandidatesCount
            candidateJSON={selectedCandidates}
            positions={positionsSummary}
          />
        </div>
        <div className='row'>
          <SectionHeader
            title={candidatesHeader.stepTitle}
            level='2'
            description={candidatesHeader.stepDescription}
          />
        </div>
        <select
          className='custom-select mb-3'
          onChange={this.sortCandidates}
          value={this.state.sortOption}
        >
          <option value='ballot-order'>Ballot Order</option>
          <option value='asc'>A to Z</option>
          <option value='desc'>Z to A</option>
        </select>
        {candidates}
        {this.renderModal()}
        <br />
        <Link to={routes.CAPITAL} className='btn btn-secondary  nextBtn'>
          NEXT
        </Link>
        <br />
        <br />
      </div>
    );
  }
}
export default Candidates;
