import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

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

    this.handleThirtyDayClick = this.handleThirtyDayClick.bind(this);
    this.handleTotalPointClick = this.handleTotalPointClick.bind(this);
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
      display: 'recent',
    });
    console.log("display: " + this.state.display);
  }

  handleTotalPointClick() {
    this.setState({
      display: 'total',
    });
    console.log("display: " + this.state.display);
  }

  render() {

    console.log(this.state.recentDays);
    console.log(this.state.totalDays);
    let stateDisplay = this.state.display;
    let buttonStyle = ['button-style', 'button-style-highlighted'];
    let tableBody = '';
    if(stateDisplay ==="total") {
      tableBody= <TotalPointRows value={this.state.totalDays}/>;
    }
    else {
      tableBody = <ThirtyDaysPointRows value={this.state.recentDays}/>;
    }

    return (
          <table>
            <thead>
              <tr>
                <th colspan='4' className='table-header'>LeaderBoard</th>
              </tr>
              <tr>
                <th>#</th>
                <th>Camper Name</th>
                <th>
                  <button className={stateDisplay === 'recent' ? buttonStyle[1] : buttonStyle[0]}
                  onClick={this.handleThirtyDayClick}>
                  Past 30 days points
                  </button>
                </th>
                <th>
                  <button className={stateDisplay === 'total' ? buttonStyle[1] : buttonStyle[0]}
                  onClick={this.handleTotalPointClick}>
                  Total Points
                  </button>
                </th>
              </tr>
            </thead>
            {tableBody}
          </table>
    );
  }
}

class ThirtyDaysPointRows extends React.Component {

  render() {
  //  console.log(this.props.value);
    const recentDaysArray = this.props.value;
    console.log(recentDaysArray);
    const thirtyDayRows = recentDaysArray.map((data, index) =>
      <CamperRow key={index+1}
        num={index+1}
        username={data.username}
        image={data.img}
        recentPoints={data.recent}
        totalPoints={data.alltime}/>
    );

    return(
      <tbody>
        {thirtyDayRows}
      </tbody>
    );
  }
}

class TotalPointRows extends React.Component {
  render() {
    const totalPointsArray = this.props.value;
    const totalPointRows = totalPointsArray.map((data, index) =>
    <CamperRow key={index+1}
      num={index+1}
      username={data.username}
      image={data.img}
      recentPoints={data.recent}
      totalPoints={data.alltime}/>
    );

    return(
      <tbody>
        {totalPointRows}
      </tbody>
    );
  }
}


class CamperRow extends React.Component {

  render() {

    return(
      <tr>
        <td className='column-style'>{this.props.num}</td>
        <td>
          <span className="name-col-style">
            <img src={this.props.image} alt={this.props.username}/>
            {this.props.username}
          </span>
        </td>
        <td className='column-style'>{this.props.recentPoints}</td>
        <td className='column-style'>{this.props.totalPoints}</td>
      </tr>
    );
  }
}

const app = document.getElementById('root');
ReactDOM.render(
    <LeaderBoardTable />,
  app
);
