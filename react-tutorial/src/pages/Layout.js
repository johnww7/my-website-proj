import React from "react";
import {Link} from "react-router-dom";

export class Layout extends React.Component {
  navigate() {
    this.props.history.push({pathname: '/', state:null});
  }

  render() {
    return (
      <div>
        <h1>KillerNews.net</h1>
        {this.props.children}
        <Link to="archives" className="btn btn-success">archives</Link>
        <Link to="settings" className="btn btn-success">settings</Link>
        <button onClick={this.navigate.bind(this)}>featured</button>
      </div>
    );
  }
}
