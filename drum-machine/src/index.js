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
/*const DRUM_PAD = [
  {id:'bell-tone', btnText: 'Q', audioId: 'Q', src: 'https://chataholic2.homestead.com/files/Door-Doorbell.wav'},
  {id:'chinese-block', btnText: 'W', audioId: 'W', src: 'https://www.footdrumplus.ca/uploads/3/4/8/6/34866267/s2-37.wav'},
  {id:'down-slide', btnText: 'E', audioId: 'E', src: 'https://home.onemain.com/~nospamtoday/noises/SLDWSTdown.WAV'},
  {id:'electric-guitar', btnText: 'A', audioId: 'A', src: electricGuitar},
  {id:'hand-cymbal', btnText: 'S', audioId: 'S', src: cymbalSingle},
  {id:'needle-scratching', btnText: 'D', audioId: 'D', src: needleScratching},
  {id:'scratch-gramophone', btnText: 'Z', audioId: 'Z', src: scratchGramophone},
  {id:'tambourine-shake', btnText: 'X', audioId: 'X', src: tambourineShake},
  {id:'two-cabasa', btnText: 'C', audioId: 'C', src: twoCabasa},
];*/


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


//    let audioElementQ = null;
//    let audioElementW = null;
//    let audioElementE = null;
  }

  componentDidMount() {
    let drumPadElements = [];
    let numberOfDrumPads = DRUM_PAD.length;
    console.log(numberOfDrumPads);
  /*  for(let index = 0; index < numberOfDrumPads; index++) {
      drumPadElements[index] = {id: DRUM_PAD[index]['btnText'], isPlaying: false};
    }*/
    /*drumPadElements = DRUM_PAD.map((obj, index) => {
      return {"id": obj.btnText, "isPlaying": false}
    });*/
    drumPadElements = DRUM_PAD.map((obj, index) => {
      return obj.btnText;
    });

    document.addEventListener('keydown', this.handleKeyDown, false);

    console.log(drumPadElements);
    this.setState({
      drumPadIds: drumPadElements,
    });
    console.log('Pad state');
    //console.log(this.state.isDrumPadPlaying);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  handleClick(id, clip, event) {
    console.log('clicked: ' + id + ' description: ' + AudioClipInformation(clip));
    console.log(this.drumPads[id]);
    let prevDrumPadPlaying = this.state.isDrumPadPlaying;
    let newClip = AudioClipInformation(clip);
    this.drumPads[id].play();

    this.setState({
        audioClip: newClip,
    });
  }

  handleKeyDown(e) {
    console.log(e.charCode);
    //console.log('key pressed: ' + id.toString());
    const drumPadArray = this.state.drumPadIds;
    console.log(drumPadArray);

    let keyPressed = e.charCode || e.keyCode
    console.log('key pressed; ' + keyPressed);
    let keyPressedCharacter = String.fromCharCode(keyPressed);
    console.log(keyPressedCharacter + ' ' + typeof keyPressedCharacter);

    //let padPressed = drumPadArray.filter((elem) => { return elem === keyPressedCharacter});
    let padPressed = this.keySearch(keyPressedCharacter);
    console.log(padPressed);
    if(padPressed !== '') {
      this.drumPads[padPressed].play();
    }
    //this.drumPads[padPressed[0]].play();
  }

  keySearch(key) {
    const drumKey = this.state.drumPadIds;
    let keyValue = '';
    switch(key) {
      case drumKey[0]:
        keyValue = key;
        break;
      case drumKey[1]:
        keyValue = key;
        break;
      case drumKey[2]:
        keyValue = key;
        break;
      case drumKey[3]:
        keyValue = key;
        break;
      case drumKey[4]:
        keyValue = key;
        break;
      case drumKey[5]:
        keyValue = key;
        break;
      case drumKey[6]:
        keyValue = key;
        break;
      case drumKey[7]:
        keyValue = key;
        break;
      case drumKey[8]:
        keyValue = key;
        break;
      default:
        console.log("error");
    }
    return keyValue;
  }

  handleClick2(elem, clip ,event) {
    console.log('clicked: ' + elem.toString() + ' description: ' + AudioClipInformation(clip));
    //console.log(this.state.isDrumPadPlaying);

    let prevDrumPadPlaying = this.state.isDrumPadPlaying;
    let newClip = AudioClipInformation(clip);
    let isPlaying = [];

    prevDrumPadPlaying.forEach((padElement, index) => {
      if(padElement.id === elem && padElement.isPlaying === false) {
        padElement.isPlaying = true;
        isPlaying.push(padElement);
      }
      else {
        padElement.isPlaying = false;
      }
    });
    console.log(isPlaying[0]);
    let drumElementStart = this.choosingDrumPadElement(elem, true);
    console.log(drumElementStart);

    console.log('new state');
    //console.log(prevDrumPadPlaying);

    this.setState({
        audioClip: newClip,
        isDrumPadPlaying: prevDrumPadPlaying,

    });
    //document.getElementById(elem.toString()).play();
    //console.log(this.refs[`drumPadElement${elem.btnText}`]);
    //console.log(this.audioElement.value);
    console.log(this.state.audioClip);
    console.log(this.state.isDrumPadPlaying);
  }
  //audioRef={el => this.audioElement = el}




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
    console.log(this.state.isDrumPadPlaying);
    const drumElements = DRUM_PAD.map((elem, index) =>
      <DrumPadElement key={elem.id} padId={elem.id} text={elem.btnText} src={elem.src}
      onClick={this.handleClick.bind(this, elem.btnText, elem.id)}
      audioRef={(audio) => { this.drumPads[elem.btnText] = audio; }}
      play={this.state.isDrumPadPlaying[index]}
      onKeyDown={this.handleKeyDown.bind(this, elem.btnText, elem.id)} />
    );
  //  const drumArray = DRUM_PAD.concat();

    return(

      <div id="drum-machine">
          <DrumDisplay nameOfClip={this.state.audioClip}/>

        {/*  <DrumPadElement padId={drumArray[0].id} text={drumArray[0].btnText} src={drumArray[0].src}
          onClick={this.handleClick.bind(this, drumArray[0].btnText, drumArray[0].id)}
          play={this.state.isDrumPadPlaying[0]} audioRef={(audio) => {this.audioElementQ = audio;}}
          onKeyDown={this.handleKeyDown.bind(this, drumArray[0].btnText)} />

          <DrumPadElement padId={drumArray[1].id} text={drumArray[1].btnText} src={drumArray[1].src}
          onClick={this.handleClick.bind(this, drumArray[1].btnText, drumArray[1].id)}
          play={this.state.isDrumPadPlaying[1]} audioRef={(audio) => {this.audioElementW = audio;}}
          onKeyDown={this.handleKeyDown.bind(this, drumArray[1].btnText)} />

          <DrumPadElement padId={drumArray[2].id} text={drumArray[2].btnText} src={drumArray[2].src}
          onClick={this.handleClick.bind(this, drumArray[2].btnText, drumArray[2].id)}
          play={this.state.isDrumPadPlaying[2]} audioRef={(audio) => {this.audioElementE = audio;}}
          onKeyDown={this.handleKeyDown.bind(this, drumArray[2].btnText)} /> */}
          {drumElements}
      </div>

    );
  }
}

class DrumPadElement extends React.Component {

  componentDidMount() {
    console.log(this.props.audioRef);
  }

  render() {
    let playDrumPad = this.props.play;
    console.log(playDrumPad);

    return(
      <div id={this.props.padId} className="drum-pad" onClick={this.props.onClick}
        onKeyDown={this.props.onKeyDown}>
        <div>{this.props.text}</div>
        <audio id={this.props.text} className="clip" ref={this.props.audioRef}
          src={this.props.src} preload>
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
