import React, {Component} from 'react';

class MultipleChoiceQuestion extends Component {

  state = {
    title : '',
    description: '',
    name: '',
    values: '',
  }

  constructor(props) {
    super(props);

    this.setState({title: props.title})
    this.setState({description: props.description})
    this.setState({name: props.name})
    this.setState({values: props.values})

    // ({ title, description, name, values, handleRadioBtn })
  }

  render() {
    const options = this.state.values.map(item => {
      return (
        <div key={item.value}>
          <input type='radio' name={this.state.name} value={item.value} onChange ={handleRadioBtn}/>
          {item.text}
        </div>
      );
    });
  
    return (
      <>
        <p>{this.state.title}</p>
        <p>{this.state.description}</p>
        {options}
      </>
    );
  }
};

export default MultipleChoiceQuestion;
