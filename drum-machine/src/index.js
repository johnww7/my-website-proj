import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class DrumMachineContainer extends React.Component {
  constructor(props) {
    super();
  }

  render() {

    return(
      <div id="drum-machine" className="col-sm-8">
        <div className="row">
          <div id="display" className="col-sm">

          </div>
        </div>
        <div className="row">
          <div className="col-4 button-style">
            <a href="#" className="drum-pad" id="Q1">
              <span>Q</span>
              <audio id="Q" className="clip"></audio>
            </a>
          </div>
          <div className="col-4 button-style">
            <a href="#" className="drum-pad" id="W2">
              <span>W</span>
              <audio id="W" className="clip"></audio>
            </a>
          </div>
          <div className="col-4 button-style">
            <a href="#" className="drum-pad" id="E3">
              <span>E</span>
              <audio id="E" className="clip"></audio>
            </a>
          </div>
          <div className="col-4 button-style">
            <a href="#" className="drum-pad" id="A4">
              <span>A</span>
              <audio id="A" className="clip"></audio>
            </a>
          </div>
          <div className="col-4 button-style">
            <a href="#" className="drum-pad" id="S5">
              <span>S</span>
              <audio id="S" className="clip"></audio>
            </a>
          </div>
          <div className="col-4 button-style">
            <a href="#" className="drum-pad" id="D6">
              <span>D</span>
              <audio id="D" className="clip"></audio>
            </a>
          </div>
          <div className="col-4 button-style">
            <a href="#" className="drum-pad" id="Z7">
              <span>Z</span>
              <audio id="Z" className="clip"></audio>
            </a>
          </div>
          <div className="col-4 button-style">
            <a href="#" className="drum-pad" id="X8">
              <span>X</span>
              <audio id="X" className="clip"></audio>
            </a>
          </div>
          <div className="col-4 button-style">
            <a href="#" className="drum-pad" id="C9">
              <span>C</span>
              <audio id="C" className="clip"></audio>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <DrumMachineContainer />,
  document.getElementById('root')
);
