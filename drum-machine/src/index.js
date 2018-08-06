import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const DRUM_PAD = [
  {id:'bell-tone', btnText: 'Q', audioId: 'Q', src:'./sounds/bell_tone.mp3'},
  {id:'chinese-block', btnText: 'W', audioId: 'W', src:'./sounds/chines_block.mp3'},
  {id:'down-slide', btnText: 'E', audioId: 'E', src:'./sounds/down_slide.mp3'},
  {id:'electric-guitar', btnText: 'A', audioId: 'A', src:'./sounds/electric_guitar.mp3'},
  {id:'hand-cymbal', btnText: 'S', audioId: 'S', src:'./sounds/handcymbal_single.mp3'},
  {id:'needle-scratching', btnText: 'D', audioId: 'D', src:'./sounds/needle_scratching.mp3'},
  {id:'scratch-gramophone', btnText: 'Z', audioId: 'Z', src:'./sounds/scractch_gramophone.mp3'},
  {id:'tambourine-shake', btnText: 'X', audioId: 'X', src:'./sounds/tambourine_shake.mp3'},
  {id:'two-cabasa', btnText: 'C', audioId: 'C', src:'./sounds/twocabasa_shake.mp3'},
];

class DrumMachineContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      audioClip: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleClick(elem, clip ,event) {
    console.log('clicked: ' + elem.toString() + ' description: ' + AudioClipInformation(clip));
    let newClip = AudioClipInformation(clip);
    this.setState({
      audioClip: newClip
    });
    console.log(this.state.audioClip.toString());
  }

  handleKeyDown(elem, event) {
    console.log('key pressed: ' + elem.key.toString());
  }

  render() {
    const drumElements = DRUM_PAD.map((elem) =>
      <DrumPadElement key={elem.id} padId={elem.id} text={elem.btnText} src={elem.src}
      onClick={this.handleClick.bind(this, elem.btnText, elem.id)} onKeyDown={this.handleKeyDown.bind(this, elem.btnText)}/>
    );

    return(

      <div id="drum-machine">
          <DrumDisplay />
          {drumElements}

      </div>

    );
  }
}

class DrumPadElement extends React.Component {
  render() {
    return(
      <div id={this.props.padId} className="drum-pad" onClick={this.props.onClick}
        onKeyDown={this.props.onKeyDown}>
        <div>{this.props.text}</div>
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

function AudioClipInformation(clipName) {
  return clipName.split('-').map((name) => name.charAt(0).toUpperCase() + name.substr(1)).join(' ');
}

ReactDOM.render(
  <DrumMachineContainer />,
  document.getElementById('root')
);
