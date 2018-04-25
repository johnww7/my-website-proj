import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {layout} from "./Layout";
//import {Featured} from "./Featured";
//import {Archives} from "./Archives";
//import {Settings} from "./Settings";

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={layout}/>
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
