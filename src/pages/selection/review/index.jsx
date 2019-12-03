import React, { Component } from 'react';
import Email from 'components/Email';
import ICS from 'components/ICS';
import { Link } from 'react-router-dom';
import * as routes from 'constants/routes';
import pyv from 'apis/pyv';
import CandidateCard from 'components/CandidateReviewCard';
import ReviewVoteCard from 'components/ReviewVoteCard';
import ReviewQuestions from 'components/ReviewQuestions';

class Review extends Component {
  state = {
    pageTitle: '',
    pageDescription: null,
    ballotIssues: [],
    candidatesSelected: [],
    racesSummary: []
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadApiData().then(response => {
      const racesSummary = this.summarizeCandidates(response.races.races);
      if (this._isMounted) {
        this.setState({
          pageTitle: response.step.stepTitle,
          pageDescription: response.step.stepDescription,
          ballotIssues: response.ballotIssues.ballotIssues,
          racesSummary,
          candidatesSelected: JSON.parse(
            sessionStorage.getItem('selectedCandidateRaces')
          ),
          pollDetails: JSON.parse(sessionStorage.getItem('pollingPlace')),
          race: response.races.races,
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  finalInfo = () => {
    let emailAddress = document.getElementById("email").value;
    
    // console.log(emailAddress);
    let candidates = this.state.candidatesSelected;
    let pollDetail = this.state.pollDetails;
    let capAnswers = JSON.parse(sessionStorage.getItem('capitalAnswers'));
    // console.log(candidates);
    // console.log(pollDetail);
    console.log(capAnswers);
    let candidatesToLink = "";
    let pollDetailToLink = "";
    let capAnswersToLink = "";
    
    // store candidates info
    candidatesToLink = "YOUR CANDIDATES IN BALLOT ORDER \n\n";
    if(candidates.length){
      for(let i = 0; i < candidates.length; i++){
        candidatesToLink += "Name: " + candidates[i].name + "\n"
                            + "Organization: " + candidates[i].organizationName + "\n"
                            + "Candidate Position: " + candidates[i].candidatePosition + "\n\n"  
      }
    }
    candidatesToLink += "\n";
    
    // store voting location info

    if(pollDetail){
      pollDetailToLink = "VOTING DAY DETAILS" + "\n\n";
      pollDetailToLink += "Place: " + pollDetail[0].pollingPlaceName + "\n"
          + "Address: " + pollDetail[0].address + "\n"
          + "Phone: " + pollDetail[0].phone + "\n"
          + "Wheelchair availability: " + pollDetail[0].wheelchairInfo + "\n\n";
      pollDetailToLink += '\n';
    }
    
    
    // store ballot issue answers
    if(capAnswers){
      capAnswersToLink = "YOUR PLANNED RESPONSES TO CAPITAL PLAN BORROWING QUESTIONS" + "\n\n"
      for(let i = 0; i < capAnswers.length; i++){
        capAnswersToLink += capAnswers[i].ballotIssueTitle + "\n\n"
            + "Your answer: " + capAnswers[i].ballotIssueAnswer + "\n\n";
      }
    }

    
    let link = `mailto:?${emailAddress}`
        + "&subject=" + escape("This is my subject")
        + "&body=" + escape(candidatesToLink) + escape(pollDetailToLink) + escape(capAnswersToLink);
    window.location.href = link;
  };

  loadApiData = async () => {
    const ballotIssues = await pyv.get('/api/ballotissues');
    const steps = await pyv.get('/api/steps');
    const races = await pyv.get('/api/races');

    const data = {
      ballotIssues: ballotIssues.data,
      step: steps.data[3],
      races: races.data
    };

    return data;
  };

  summarizeCandidates = (races = []) => {
    const racesSummary = [];
    races.forEach(race => {
      racesSummary.push({
        positionName: race.positionName,
        numberNeeded: race.numberNeeded
      });
    });
    return racesSummary;
  };

  renderCandidates = race => {
    let { candidatesSelected } = this.state;

    if (!candidatesSelected) {
      return;
    }

    return candidatesSelected.map(candidate => {
      if (!candidate) {
        return null;
      }

      if (candidate.candidatePosition === race) {
        return (
          <CandidateCard
            key={candidate.candidateId}
            candidate={candidate}
            remove={this.removeFunc}
          />
        );
      }

      return null;
    });
  };

  removeFunc = candidate => {
    const { candidatesSelected } = this.state;

    const found = candidatesSelected.findIndex(
      cand => cand.candidateId === candidate.candidateId
    );

    if (found > -1) {
      candidatesSelected.splice(found, 1);
    } else {
      console.error('Candidate Not Found!?');
    }

    this.setState(
      {
        candidatesSelected
      },
      () => {
        if (found > -1) {
          sessionStorage.removeItem('selectedCandidateRaces');
        }
        sessionStorage.setItem(
          'selectedCandidateRaces',
          JSON.stringify(candidatesSelected)
        );
      }
    );
  };

  candidateCount = positionName => {
    const { candidatesSelected } = this.state;

    let count = 0;
    if (!candidatesSelected) {
      return count;
    }

    for (let i = 0; i < candidatesSelected.length; i++) {
      if (candidatesSelected[i].candidatePosition === positionName) {
        count += 1;
      }
    }
    return count;
  };

  mcQ = () => {
    const data = JSON.parse(sessionStorage.getItem('capitalAnswers'));

    if (!data) {
      return null;
    }

    return data.map(mcQuestions => {
      return (
        <ReviewQuestions
          key={mcQuestions.ballotIssueID}
          title={mcQuestions.ballotIssueTitle}
          answer={mcQuestions.ballotIssueAnswer}
          description={mcQuestions.ballotIssueDescription}
        />
      );
    });
  };

  candidatesSummary = (positionName, numberNeeded) => {
    return (
      <>
        <div className='col-12'>
          <h4>
            {`${positionName} ${this.candidateCount(
              positionName
            )} of ${numberNeeded}`}
          </h4>
        </div>
        {this.renderCandidates(positionName)}
      </>
    );
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h2>{this.state.pageTitle}</h2>
          </div>
          <div className='col-12'>
            <p>{this.state.pageDescription}</p>
          </div>
        </div>
        <div className='row reviewHeaderTitle'>
          <h3 className='card-subtitle mb-2 text-muted'>
            YOUR CANDIDATES IN BALLOT ORDER:
          </h3>
        </div>
        {this.state.racesSummary.map(race => {
          return (
            <div className='row' key={race.positionName}>
              {this.candidatesSummary(race.positionName, race.numberNeeded)}
            </div>
          );
        })}
        <div className='row reviewHeaderTitle'>
          <h3 className='card-subtitle mb-2 text-muted'>
            YOUR PLANNED RESPONSES TO CAPITAL PLAN BORROWING QUESTIONS:
          </h3>
        </div>
        <div className='row mb-4'>{this.mcQ()}</div>
        <div className='row'>
          <h3 className='card-subtitle mb-2 text-muted'>VOTING DAY DETAILS</h3>
        </div>
        <div className='row'>
          <div className='pollSection'>
            <ReviewVoteCard pollDetails={this.state.pollDetails} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6' />
          <div className='col-md-6'>
            <Email finalInfo={this.finalInfo}/>
            <ICS data={this.state}/>
          </div>
        </div>
        <Link to={routes.SCHEDULE} className='btn btn-secondary backBtn'>
          BACK
        </Link>
      </div>
    );
  }
}

export default Review;
