import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {Layout} from "./Layout";

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Layout}/>
      </Router>

    );
  }
}
