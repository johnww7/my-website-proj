import React from 'react';
import ReactDOM from 'react-dom';

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
  }

  handleTotalPointClick() {
    this.setState({
      display: 'total',
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
                <th>Image</th>
                <th>Camper Name</th>
                <th><button className="btn btn-link" onClick={this.handleThirtyDayClick}>
                  Past 30 days points</button>
                </th>
                <th><button className="btn btn-link" onClick={this.handleTotalPointClick}>
                  Total Points</button>
                </th>
              </tr>
            </thead>

            {/*  <ThirtyDaysPointRows value={this.state.recentDays}/> */}
              <TotalPointRows value={this.state.totalDays}/>

          </table>
        </div>

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
        <td>{this.props.num}</td>
        <td><img src={this.props.image} /></td>
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
