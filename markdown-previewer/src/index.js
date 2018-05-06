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
    this.returnMarkUp = this.returnMarkUp.bind(this);
  }

  handleChange(event) {
    let markedText = marked(event.target.value);
    //let docText = new DOMParser().parseFromString(markedText, 'text/html');
    console.log(typeof markedText);
    //let tokens = marked.lexer(event.target.value);
    this.setState({
      text: markedText,
    });
  }

  returnMarkUp() {
    return {_html: this.state.text};
  }

  render() {
    return(
      <div className="row">
        <div className="col-6">
          <InputText onChange={this.handleChange}/>
        </div>
        <div className ="col-6 output-display">
          <pre dangerouslySetInnerHTML={{_html: this.state.text}} />
        </div>

      </div>
    );
  }
}

class InputText extends React.Component {

  render() {

    return (
      <div>
        <textarea rows='25' cols='40' value={this.props.value} onChange={this.props.onChange}/>
      </div>
    );
  }
}

class OutputText extends React.Component {
  //
  render() {
    let outputValue = this.props.dangerouslySetInnerHTML._html;
    //<pre className='output-display'>{outputValue}</pre>
    return (
      <div className='output-display' dangerouslySetInnerHTML={{_html: outputValue}} />


    );
  }
}

const app = document.getElementById('root');
ReactDOM.render(
  <MarkdownContainer />,
  app
);
