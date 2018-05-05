import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MarkdownContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '### Another deeper heading# Marked in the browserRendered by **marked**.',
    };
  }

  render() {
    return(
      <div className="row">
        <div className="col-6">
          <InputText />
        </div>
        <div className ="col-6">
          <OutputText value={this.state.text} />
        </div>

      </div>
    );
  }
}

class InputText extends React.Component {

  render() {
// value={this.props.value} onChange={this.handleChange}
    return (
      <div>
        <textarea rows='25' cols='40'/>
      </div>
    );
  }
}

class OutputText extends React.Component {

  render() {
    return (
      <div>
        <pre className='output-display'>{this.props.value}</pre>
      </div>
    );
  }
}

const app = document.getElementById('root');
ReactDOM.render(
  <MarkdownContainer />,
  app
);
