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
    filteredRaces: [],
    candidatesHeader: {
      stepTitle: '',
      stepDescription: ''
    },
    selectedCandidates: [],
    selectedRace: '',
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
      let selections = JSON.parse(window.sessionStorage.getItem('selectedCandidateRaces'));
      if (selections == null)
        selections = [];
      if (this._isMounted) {
        const { stepTitle, stepDescription, stepNumber } = response.step;
        let races = response.races.races;
        for (const race of races) {
          race.candidates.sort((a, b) => {
            return a.ballotOrder - b.ballotOrder;
          });
        }
        this.setState({
          races: response.races.races,
          filteredRaces: response.races.races,
          candidatesHeader: {
            stepTitle,
            stepDescription,
            stepNumber
          },
          selectedCandidates: selections,
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

  toggleHighlightedCandidate(id) {
    let candidate = document.getElementById(`candidate-card-${id}`);
    if (candidate.style.border === "1px solid crimson") {
      candidate.style.border = "";
    } else {
      candidate.style.border = "1px solid crimson";
    }
  } 

  selectBtn = (position, candidate) => event => {
    const { selectedCandidates } = this.state;
    const newCandidates = selectedCandidates.slice(0);
    const found = selectedCandidates.findIndex(
      cand => cand.candidateId === candidate.candidateId
    );

    if (found > -1) {
      newCandidates.splice(found, 1);
			this.toggleHighlightedCandidate(candidate.candidateId);

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
			this.toggleHighlightedCandidate(candidate.candidateId);
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
    } else if (e.target.value === 'ascl') {
      for (const race of races) {
        race.candidates.sort(this.sortByLastNameAsc);
      }
    } else if (e.target.value === 'descl') {
      for (const race of races) {
        race.candidates.sort(this.sortByLastNameDesc);
      }
    }
    //added
    else if (e.target.value === 'ascf') {
      for (const race of races) {
        race.candidates.sort(this.sortByFirstNameAsc);
      }
    } else if (e.target.value === 'descf') {
      for (const race of races) {
        race.candidates.sort(this.sortByFirstNameDesc);
      }
    }

    if (this._isMounted) {
      this.setState({
        races
      });
    }
  };
  /* Peter Kim cda issue 78: filterByRace is called whenever a race selection dropdown value is 
     selected. This checks the chosen value, and if it is 'All', (currently hard-coded into HTML)
     displays all races. If a specific race is chosen, a filtered race result is displayed.
     Note that this actually updates the race state, to display only the chosen race-related UI. */
  filterByRace = e => {
    if (this._isMounted) {
      this.setState({
        selectedRace: e.target.value
      })
    }
    e.target.value === 'All' ? 
      this.setState({
        races: this.state.filteredRaces
      }) :
      this.setState({
        races: this.state.filteredRaces.filter((race) => race.positionName === e.target.value)
      })
    }

    //original function
    sortByLastNameAsc = (a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    };
  
    sortByLastNameDesc = (a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    };
  
    //added
    sortByFirstNameAsc = (a, b) => {
      if (a.name.split(" ")[1] < b.name.split(" ")[1]) {
        return -1;
      }
      if (a.name.split(" ")[1] > b.name.split(" ")[1]) {
        return 1;
      }
      return 0;
    };
  
    sortByFirstNameDesc = (a, b) => {
      if (a.name.split(" ")[1] < b.name.split(" ")[1]) {
        return 1;
      }
      if (a.name.split(" ")[1] > b.name.split(" ")[1]) {
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
    /* Peter Kim. Front-End issue #4. This fixes the bug where filter by race breaks
       when attempting to filter after a candidate selection. the state "filteredRaces"
       will have a constant length (of all races), compared to the state "races" which
       would update dynamically, based on user selection.  */
    this.state.filteredRaces.forEach(race => {
      positionsSummary.push({
        positionName: race.positionName,
        numberNeeded: race.numberNeeded
      });
    });

    /* Peter Kim, cda issue 78: Created a const raceFilter to dynamically render all race options 
       available from race state into option tags. Since "All" option is not included within the 
       race state, manually going to insert the "All" option within the HTML return below. 
       TODO: Should "All" option be part of the "races" state? It seems like a desirable option for 
       any election to have. */
    const raceFilter = this.state.filteredRaces.length === 0 ? null 
    : this.state.filteredRaces.map((race => {
      return (
        <option value={race.positionName} key={race.positionName}>{race.positionName}</option>
      );
    }))

    return (
      <div className='container'>
        <div className='canTable'>
          <CandidatesCount
            candidateJSON={selectedCandidates}
            positions={positionsSummary}
          />
        </div>

        <select
          className='custom-select mb-3'
          onChange={this.sortCandidates}
          value={this.state.sortOption}
        >
          <option value='ballot-order'>Ballot Order</option>
          <option value='ascl'>A to Z by Last Name</option>
          <option value='ascf'>A to Z by First Name</option>
          <option value='descl'>Z to A by Last Name</option>
          <option value='descf'>Z to A by First Name</option>
        </select>
        <select
          className='custom-select mb-3'
          onChange={this.filterByRace}
          value={this.state.selectedRace}
        >
          <option value='All' key='All'>All</option> 
          {raceFilter}
        </select>

        <SectionHeader
          title={candidatesHeader.stepTitle}
          level='2'
          description={candidatesHeader.stepDescription}
        />
        <Link to={routes.CAPITAL} className='btn btn-secondary nextBtn'>
          NEXT
        </Link>
        {candidates}
        {this.renderModal()}
        <br />
        <Link to={routes.CAPITAL} className='btn btn-secondary nextBtn'>
          NEXT
        </Link>
        <br />
        <br />
      </div>
    );
  }
}
export default Candidates;
