import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import './index.css';

class BoardContainer extends React.Component {

  render() {

    return (
      <Router>
        <div>
          <table>
            <tr>
              <th>#</th>
              <th>Camper Name</th>
              <th><Link to="/">Past 30 days points</Link></th>
              <th><Link to="/total">Total Points</Link></th>
            </tr>
          </table>

          <Route exact path="/" component={PointsThirtyDays}/>
          <Route path="/total" component={TotalPoints}/>
        </div>
      </Router>
    );
  }
}

class PointsThirtyDays extends React.Component {

  render() {
    return(
      <div><h1>Points Thirty days</h1></div>
    );
  }
}

class TotalPoints extends React.Component {
  render() {
    return(
      <div><h1>Total Points</h1></div>
    );
  }
}


class TableRow extends React.Component {

  render() {
    return(
      <h2>Table row</h2>
    );
  }
}

const app = document.getElementById('root');
ReactDOM.render(
  <Router>
    <BoardContainer />
  </Router>,
  app
);
