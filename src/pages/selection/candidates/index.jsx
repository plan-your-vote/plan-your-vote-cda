import React, { Component } from 'react';
import SectionHeader from 'components/SectionHeader';
import pyv from 'utils/api/pyv';

class Candidates extends Component {
  _isMounted = false;
  state = {
    candidates: [],
    candidatesHeader: {}
  };
  componentDidMount() {
    this._isMounted = true;
    this.loadCandidatesApi().then(data => {
      
      if (this._isMounted) {
        this.setState({
          candidates: data[0], 
          candidatesHeader: data[1]
        });
      }
    }
    );
    console.log(this.state.candidates);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  loadCandidatesApi = async () => {
    const response = await pyv.get('/candidates');
    const response2 = await pyv.get('/races'); 
    return [response.data, response2.data];
  };

  render() {
    const {candidatesHeader} = this.state
    const cTitleDescription = []  
    const cardStyle = {
      maxWidth: '540px'
    };

    

    // for (var cSection in candidatesHeader) { 
    //   cTitleDescription.push( 
    //     <SectionHeader
    //         title={candidatesHeader[cSection].pageTitle} 
    //         subtitle=""
    //         level='2'
    //         description={candidatesHeader[cSection].pageDescription}
    //       /> 
    //   )
    // } 

    let candidates = this.state.candidates.map(cData => {
      return (
        <div className='col-sm-3'>
          <div className='card' style={cardStyle}>
            <img src={cData.picture} className='card-img-top' alt='...' />
            <div className='card-body'>
              <h5 className='card-title'>{cData.name}</h5>
              {/* <h6 className="card-subtitle mb-2 text-muted">cData.organization</h6> */}
              {/* <h6 className="card-subtitle mb-2 text-muted">cData.position</h6> */}
              <p className='card-text'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href='#' className='btn btn-primary'>
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      );
    });

    console.log(this.state.candidatesHeader) //one sec how did u want me to do it last time?
    return (
      <div className='container'>
        <div className='row'>
          {/* {cTitleDescription} */}
          <SectionHeader
            title={candidatesHeader["votingPage"].pageTitle} 
            subtitle=""
            level='2'
            description={candidatesHeader["votingPage"].pageDescription} 
          />
          {candidates}
        </div>
      </div>
    );
  }
}
export default Candidates;
