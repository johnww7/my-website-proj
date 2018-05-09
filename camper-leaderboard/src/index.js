import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import './index.css';


//LeaderBoardTable
//--TableHeader(optional)
//---ThirtyDaysPointRows
//---TotalPointRows
//----CamperRow
class LeaderBoardTable extends React.Component {

  render() {

    return (
      <Router>
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Camper Name</th>
                <th><Link to="/thirtDaysPoints">Past 30 days points</Link></th>
                <th><Link to="/totalPoints">Total Points</Link></th>
              </tr>
            </thead>
            <tbody>
              <Switch>
                <Route path="/thirtDaysPoints" component={ThirtyDaysPointRows}/>
                <Route path="/totalPoints" component={TotalPointRows}/>
            </Switch>
            </tbody>
          </table>


        </div>
      </Router>
    );
  }
}

class ThirtyDaysPointRows extends React.Component {

  render() {
    return(
      <CamperRow id="4" username="Lisa Allen" recentPoints="60" totalPoints="800"/>
    );
  }
}

class TotalPointRows extends React.Component {
  render() {
    return(
      <CamperRow id="10" username="Brett Smith" recentPoints="9" totalPoints="4000"/>
    );
  }
}


class CamperRow extends React.Component {

  render() {

    return(
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.username}</td>
        <td>{this.props.recentPoints}</td>
        <td>{this.props.totalPoints}</td>
      </tr>
    );
  }
}

const app = document.getElementById('root');
ReactDOM.render(
  <Router>
    <LeaderBoardTable />
  </Router>,
  app
);
