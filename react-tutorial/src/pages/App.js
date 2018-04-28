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

/*
<Switch>
  <Route  exact path="/" component={Layout} />
  <Route  path="/featured" component={Featured} />
  <Route  path="/archives" component={Archives} />
  <Route  path="/settings" component={Settings} />
</Switch>


 */
