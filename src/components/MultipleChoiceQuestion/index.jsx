import React, { Component } from 'react';

class MultipleChoiceQuestion extends Component {
  state = {
    title: '',
    description: '',
    name: '',
    values: []
  };

  componentDidMount() {
    this.setState({
      title: this.props.title,
      description: this.props.description,
      name: this.props.name,
      values: this.props.values
    });
  }

  render() {
    const options = this.state.values.map(item => {
      return (
        <div key={item.value}>
          <input
            type='radio'
            name={this.state.name}
            value={item.value}
            onChange={this.props.handleRadioBtn}
          />
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
}

export default MultipleChoiceQuestion;
