import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import bellTone from './sounds/bell_tone.mp3';
import chineseBlock from './sounds/chinese_block.mp3';
import downSlide from './sounds/down_slide.mp3';
import electricGuitar from './sounds/electric_guitar.mp3';
import cymbalSingle from './sounds/handcymbal_single.mp3';
import needleScratching from './sounds/needle_scratching.mp3';
import scratchGramophone from './sounds/scratch_gramophone.mp3';
import tambourineShake from './sounds/tambourine_shake.mp3';
import twoCabasa from './sounds/twocabasa_shake.mp3';

const DRUM_PAD = [
  {id:'bell-tone', btnText: 'Q', audioId: 'Q', src: bellTone},
  {id:'chinese-block', btnText: 'W', audioId: 'W', src: chineseBlock},
  {id:'down-slide', btnText: 'E', audioId: 'E', src: downSlide},
  {id:'electric-guitar', btnText: 'A', audioId: 'A', src: electricGuitar},
  {id:'hand-cymbal', btnText: 'S', audioId: 'S', src: cymbalSingle},
  {id:'needle-scratching', btnText: 'D', audioId: 'D', src: needleScratching},
  {id:'scratch-gramophone', btnText: 'Z', audioId: 'Z', src: scratchGramophone},
  {id:'tambourine-shake', btnText: 'X', audioId: 'X', src: tambourineShake},
  {id:'two-cabasa', btnText: 'C', audioId: 'C', src: twoCabasa},
];

class DrumMachineContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      audioClip: ' ',
      audioPlay: false,
      audioEle: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.audioElement = React.createRef();
  }


  handleClick(elem, clip ,event) {
    console.log('clicked: ' + elem.toString() + ' description: ' + AudioClipInformation(clip));
    let newClip = AudioClipInformation(clip);
    this.setState({
      audioClip: newClip,
      audioPlay: !this.state.audioPlay,
    });
    //document.getElementById(elem.toString()).play();
    //console.log(this.refs[`drumPadElement${elem.btnText}`]);
    console.log(this.audioElement.current);
    console.log(this.state.audioClip);
  }

  handleKeyDown(elem, event) {
    console.log('key pressed: ' + elem.key.toString());
  }

  render() {
    const drumElements = DRUM_PAD.map((elem) =>
      <DrumPadElement key={elem.id} padId={elem.id} text={elem.btnText} src={elem.src}
      onClick={this.handleClick.bind(this, elem.btnText, elem.id)} play={this.state.audioStart}
      onKeyDown={this.handleKeyDown.bind(this, elem.btnText)} audioRef={audioRef => this.state.audioEle[elem.btnText] = audioRef}/>
    );

    return(

      <div id="drum-machine">
          <DrumDisplay nameOfClip={this.state.audioClip}/>
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
        <audio id={this.props.text} className="clip" ref={this.props.audioRef}
          src={this.props.source}>
        </audio>
      </div>
    );
  }
}

const DrumDisplay = (props) => {
  return (
    <div id="display">{props.nameOfClip}</div>
  );
};

function AudioClipInformation(clipName) {
  return clipName.split('-').map((name) => name.charAt(0).toUpperCase() + name.substr(1)).join(' ');
}

ReactDOM.render(
  <DrumMachineContainer />,
  document.getElementById('root')
);
