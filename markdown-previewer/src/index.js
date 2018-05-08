import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import './index.css';

class MarkdownContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ' ',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let markedText = marked(event.target.value);
    this.setState({
      text: markedText,
    });
  }

  render() {
    return(
      <div className="row">
        <div className="col-sm-6 col-lg-6 p-3">
          <InputTextBox onChange={this.handleChange}/>
        </div>
        <div className ="col-sm-10 col-lg-6 p-3">
          <OutputTextBox textValue={this.state.text}/>
        </div>
      </div>
    );
  }
}

class InputTextBox extends React.Component {

  render(){
    return (
        <textarea className="w-100"
          rows='20' cols='40' value={this.props.value} onChange={this.props.onChange}/>
    );
  }
}

class OutputTextBox extends React.Component {

  render() {
    return (
      <div className='output-display w-100'
        dangerouslySetInnerHTML={{__html: (this.props.textValue || '')}}/>
    );
  }
}

const app = document.getElementById('root');
ReactDOM.render(
  <MarkdownContainer />,
  app
);
