import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {Layout} from "./pages/Layout";
import {Featured} from "./pages/Featured";
import {Archives} from "./pages/Archives";
import {Settings} from "./pages/Settings";

const app = document.getElementById('app');
ReactDOM.render(
  <Router>
    <Route path="/" component={Layout}>

    </Route>
  </Router>,
  app);
