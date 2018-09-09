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

const DRUM_PAD2 = [
  {id:'bell-tone', btnText: 'Q', src: bellTone},
  {id:'chinese-block', btnText: 'W', src: chineseBlock},
  {id:'down-slide', btnText: 'E', src: downSlide},
  {id:'electric-guitar', btnText: 'A', src: electricGuitar},
  {id:'hand-cymbal', btnText: 'S', src: cymbalSingle},
  {id:'needle-scratching', btnText: 'D', src: needleScratching},
  {id:'scratch-gramophone', btnText: 'Z', src: scratchGramophone},
  {id:'tambourine-shake', btnText: 'X', src: tambourineShake},
  {id:'two-cabasa', btnText: 'C', src: twoCabasa},
];
const DRUM_PAD = [
  {id:'bell-tone', btnText: 'Q', audioId: 'Q', src: 'https://chataholic2.homestead.com/files/Door-Doorbell.wav'},
  {id:'chinese-block', btnText: 'W', audioId: 'W', src: 'https://www.footdrumplus.ca/uploads/3/4/8/6/34866267/s2-37.wav'},
  {id:'down-slide', btnText: 'E', audioId: 'E', src: 'http://home.onemain.com/~nospamtoday/noises/SLDWSTdown.WAV'},
  {id:'electric-guitar', btnText: 'A', audioId: 'A', src: 'http://cd.textfiles.com/cdaction/cdaction47b/BEAT2000/SOUNDS/SFX/BADGTR.WAV'},
  {id:'hand-cymbal', btnText: 'S', audioId: 'S', src: 'https://www.drumsoundz.com/Crash-03.wav'},
  {id:'needle-scratching', btnText: 'D', audioId: 'D', src: 'https://sampleswap.org/samples-ghost/DRUM%20LOOPS%20and%20BREAKS/turntables%20and%20scratching/148[kb]turntable-oh2.WAV.mp3'},
  {id:'scratch-gramophone', btnText: 'Z', audioId: 'Z', src: 'http://s1download-universal-soundbank.com/wav/1639.wav'},
  {id:'tambourine-shake', btnText: 'X', audioId: 'X', src: 'http://machines.hyperreal.org/machines/manufacturers/Sequential/Drumtraks/samples/tmp/Drumtraks/DT_Tamborine.wav'},
  {id:'two-cabasa', btnText: 'C', audioId: 'C', src: 'http://dight310.byu.edu/media/audio/FreeLoops.com/2/2/Cabasa%20Hits-1437-Free-Loops.com.mp3'},
];


class DrumMachineContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      audioClip: ' ',
      audioPlay: false,
      isDrumPadPlaying: [],
      drumPadIds: [],
    };

    this.drumPads = {};

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.keySearch = this.keySearch.bind(this);
  }

  componentDidMount() {
    let drumPadElements = [];
    let numberOfDrumPads = DRUM_PAD.length;

    drumPadElements = DRUM_PAD.map((obj, index) => {
      return {text: obj.btnText, id: obj.id};
    });

    document.addEventListener('keydown', this.handleKeyDown, false);

    this.setState({
      drumPadIds: drumPadElements,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  handleClick(id, clip, event) {
    let newClip = AudioClipInformation(clip);
    this.drumPads[id].play();

    this.setState({
        audioClip: newClip,
    });
  }

  handleKeyDown(e) {
    const drumPadArray = this.state.drumPadIds;

    let keyPressed = e.charCode || e.keyCode
    let keyPressedCharacter = String.fromCharCode(keyPressed);
    let padPressed = this.keySearch(keyPressedCharacter);

    if(padPressed.key !== '') {
      this.drumPads[padPressed.key].play();
    }
    this.setState({
      audioClip: padPressed.clip,
    });
  }

  keySearch(key) {
    const drumKey = this.state.drumPadIds;
    let keyValue = '';
    let audioClip = '';
    switch(key) {
      case drumKey[0].text:
        keyValue = key;
        audioClip = drumKey[0].id;
        break;
      case drumKey[1].text:
        keyValue = key;
        audioClip = drumKey[1].id;
        break;
      case drumKey[2].text:
        keyValue = key;
        audioClip = drumKey[2].id;
        break;
      case drumKey[3].text:
        keyValue = key;
        audioClip = drumKey[3].id;
        break;
      case drumKey[4].text:
        keyValue = key;
        audioClip = drumKey[4].id;
        break;
      case drumKey[5].text:
        keyValue = key;
        audioClip = drumKey[5].id;
        break;
      case drumKey[6].text:
        keyValue = key;
        audioClip = drumKey[6].id;
        break;
      case drumKey[7].text:
        keyValue = key;
        audioClip = drumKey[7].id;
        break;
      case drumKey[8].text:
        keyValue = key;
        audioClip = drumKey[8].id;
        break;
      default:
        console.log("error");
        audioClip = this.state.audioClip;
        break;
    }
    return {key: keyValue, clip: audioClip};
  }

  createDrumPads(drumArray) {
    return drumArray.map((elem, index) => {
      return (
        <div key={elem.id} id={elem.id} className="drum-pad" onClick={this.props.onClick}
          onKeyDown={this.props.onKeyDown}>
          <div>{elem.btnText}</div>
          <audio id={elem.btnText} className="clip" ref={this.props.audioRef}
            src={elem.src} preload>
          </audio>
        </div>
      );
    });
  }

  render() {
    const drumElements = DRUM_PAD.map((elem, index) =>
      <DrumPadElement key={elem.id} padId={elem.id} text={elem.btnText} src={elem.src}
      onClick={this.handleClick.bind(this, elem.btnText, elem.id)}
      audioRef={(audio) => { this.drumPads[elem.btnText] = audio; }}
      play={this.state.isDrumPadPlaying[index]}
      onKeyDown={this.handleKeyDown.bind(this, elem.btnText, elem.id)} />
    );

    return(
      <div id="drum-machine" className="drum-machine-container">
          <DrumDisplay nameOfClip={this.state.audioClip}/>
          {drumElements}
      </div>

    );
  }
}

const DrumPadElement = (props) => {
  return(
    <div id={props.padId} className="drum-pad drum-style" onClick={props.onClick}
      onKeyDown={props.onKeyDown}>
      <div>{props.text}</div>
      <audio id={props.text} className="clip" ref={props.audioRef}
        src={props.src}>
      </audio>
    </div>
  );
}

const DrumDisplay = (props) => {
  return (
    <div id="display" className="display-styling">{props.nameOfClip}</div>
  );
};

function AudioClipInformation(clipName) {
  return clipName.split('-').map((name) => name.charAt(0).toUpperCase() + name.substr(1)).join(' ');
}

ReactDOM.render(
  <DrumMachineContainer />,
  document.getElementById('root')
);
