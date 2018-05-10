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

  constructor(){
    super();
    this.state = {
      error: null,
      dataLoaded: false,
      display: 'recent',
      recentDays: [],
      totalDays: []
    };
  }

  componentDidMount() {
    let recentDays = fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(
      response => response.json()
    );
    let totalDays = fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime').then(
      response => response.json()
    );

    Promise.all([recentDays, totalDays]).then(
      (result) => {
        this.setState({
          dataLoaded: true,
          recentDays: result[0],
          totalDays: result[1],
        });
      },
      (error) => {
        this.setState({
          error,
          dataLoaded: false,
        });
      }
    );
  }

  handleThirtyDayClick() {
    this.setState({
      display: 'recent'
    });
  }

  handleTotalPointClick() {
    this.setState({
      display: 'total'
    });
  }

  render() {

    console.log(this.state.recentDays);
    console.log(this.state.totalDays);
    return (
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Camper Name</th>
                <th><button className="btn btn-link" onClick={this.handleThirtyDayClick}>
                  Past 30 days points</button>
                </th>
                <th><button className="btn btn-link" onClick={this.handleTotalPointClick}>
                  Total Points</button>
                </th>
              </tr>
            </thead>
            <tbody>
              <ThirtyDaysPointRows />
              <TotalPointRows />
            </tbody>
          </table>
        </div>

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
    <LeaderBoardTable />,
  app
);
