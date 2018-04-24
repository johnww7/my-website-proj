import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {Layout} from "./Layout";
import {Featured} from "./Featured";
import {Archives} from "./Archives";
import {Settings} from "./Settings";

export class App extends React.Component {
  render() {
    return (
          <Switch>
            <Route  path="/" component={Layout} />
            <Route  path="featured" component={Featured} />
            <Route  path="archives" component={Archives} />
            <Route  path="settings" component={Settings} />
          </Switch>


    );
  }
}
