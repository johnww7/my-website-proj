import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MarkdownContainer extends React.Component {

  render() {

  }
}

class InputText extends React.Component {

  render() {

    return (
      <div>
        <textarea value={this.props.value} onChange={this.handleChange} />
      </div>
    );
  }
}

class OutputText extends React.Component {

  render() {

  }
}

const app = document.getElementById('root');
ReactDOM.render(
  <MarkdownContainer />,
  app
);
