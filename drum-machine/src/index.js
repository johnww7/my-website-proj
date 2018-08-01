import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const DRUM_PAD = [
  {id:'bellTone', btnText: 'Q', audioId: 'Q', src:'./sounds/bell_tone.mp3'},
  {id:'chineseBlock', btnText: 'W', audioId: 'W', src:'./sounds/chines_block.mp3'},
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

      <div id="drum-machine">
          <DrumDisplay />

          <DrumPadElement padId={DRUM_PAD[0]['id']} text={DRUM_PAD[0]['btnText']}/>
          <DrumPadElement padId={DRUM_PAD[1]['id']} text={DRUM_PAD[1]['btnText']} />
          <DrumPadElement padId={DRUM_PAD[2]['id']} text={DRUM_PAD[2]['btnText']}/>

      </div>

    );
  }
}

class DrumPadElement extends React.Component {
  render() {
    return(
      <div id={this.props.padId} className="drum-pad">
        <span>{this.props.text}</span>
        <audio id={this.props.text} className="clip" src={this.props.source}></audio>
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
