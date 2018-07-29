import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const DRUM_PAD = [
  {id:'bellTone', btnText: 'Q', audioId: 'Q', src:'./sounds/bell_tone.mp3'},
  {id:'chinesBlock', btnText: 'W', audioId: 'W', src:'./sounds/chines_block.mp3'},
  {id:'downSlide', btnText: 'E', audioId: 'E', src:'./sounds/down_slide.mp3'},
  {id:'electricGuitar', btnText: 'A', audioId: 'A', src:'./sounds/electric_guitar.mp3'},
  {id:'handCymbal', btnText: 'S', audioId: 'S', src:'./sounds/handcymbal_single.mp3'},
  {id:'needleScratching', btnText: 'D', audioId: 'D', src:'./sounds/needle_scratching.mp3'},
  {id:'scratchGramophone', btnText: 'Z', audioId: 'Z', src:'./sounds/scractch_gramophone.mp3'},
  {id:'tambourineShake', btnText: 'X', audioId: 'X', src:'./sounds/tambourine_shake.mp3'},
  {id:'twoCabasa', btnText: 'C', audioId: 'C', src:'./sounds/twocabasa_shake.mp3'},
];

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
            <a href="Q" className="drum-pad" id="Q1"></a>
            <span>Q</span>
            <audio id="Q" className="clip" src="http://freesound.iua.upf.edu/forum/viewtopic.php?t=1212 ">

            </audio>
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

class DrumPadElement extends React.Component {
  render() {
    return(
      <div>
        <a></a>
        <span></span>
        <audio></audio>
      </div>
    );
  }
}

const DrumDisplay = () => {
  return (
    <div id="display">Inital String</div>
  );
};

ReactDOM.render(
  <DrumMachineContainer />,
  document.getElementById('root')
);
