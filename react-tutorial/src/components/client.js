import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';


class Layout extends React.Component {
  constructor() {
    super();
    this.state ={title: "Welcome"};
    this.changeTitle = this.changeTitle.bind(this);
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div>
        <Header changeTitle = {this.changeTitle} title ={this.state.title}/>
        <Footer />
      </div>
    );
  }
}

class Header extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }

  render() {
    return (
      <div>
        <Title title={this.props.title} />
        <input value={this.props.title} onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer>footer</footer>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <h1>{this.props.title}</h1>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';


class Layout extends React.Component {
  constructor() {
    super();
    this.state ={title: "Welcome"};
    this.changeTitle = this.changeTitle.bind(this);
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div>
        <Header changeTitle = {this.changeTitle} title ={this.state.title}/>
        <Footer />
      </div>
    );
  }
}

class Header extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }

  render() {
    return (
      <div>
        <Title title={this.props.title} />
        <input value={this.props.title} onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer>footer</footer>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <h1>{this.props.title}</h1>
    );
  }
}

const app = document.getElementById('app');
//ReactDOM.render(<Layout/>, app);
