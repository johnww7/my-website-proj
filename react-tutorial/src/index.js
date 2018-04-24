import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {App} from "./pages/App";


const app = document.getElementById('app');
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  app);
