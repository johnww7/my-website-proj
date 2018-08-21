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
      isDrumPadPlaying: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.choosingDrumPadElement = this.choosingDrumPadElement.bind(this);

    this.audioElementQ = React.createRef();
    this.audioElementW = React.createRef();
    this.audioElementE = React.createRef();
  }

  componentDidMount() {
    let drumPadElements = [];
    let numberOfDrumPads = DRUM_PAD.length;
    console.log(numberOfDrumPads);
  /*  for(let index = 0; index < numberOfDrumPads; index++) {
      drumPadElements[index] = {id: DRUM_PAD[index]['btnText'], isPlaying: false};
    }*/
    drumPadElements = DRUM_PAD.map((obj, index) => {
      return {"id": obj.btnText, "isPlaying": false}
    });

    console.log(drumPadElements);
    this.setState({
      isDrumPadPlaying: drumPadElements,
    });
    console.log('Pad state');
    //console.log(this.state.isDrumPadPlaying);
  }

  handleClick(elem, clip ,event) {
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
    let drumElementStart = this.choosingDrumPadElement(isPlaying[0]);
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
  handleKeyDown(elem, event) {
    console.log('key pressed: ' + elem.key.toString());
  }

  choosingDrumPadElement(padElementObj) {
    if(padElementObj.isPlaying) {
      switch(padElementObj.id) {
        case 'Q':
          this.audioElementQ.current.play();
          console.log(this.audioElementQ.current.play());
          break;
        case 'W':
          this.audioElementW.current.play();
          break;
        case 'E':
          this.audioElementE.current.play();
          break;
        default:
          console.log('An error has occured');
      }
      return true;
    }
    else {
      switch(padElementObj.id) {
        case 'Q':
          this.audioElementQ.current.pause();
          break;
        case 'W':
          this.audioElementW.current.pause();
          break;
        case 'E':
          this.audioElementE.current.pause();
          break;
        default:
          console.log('An error has occured');
      }
      return false;
    }
  }

  render() {
    console.log(this.state.isDrumPadPlaying);
    /*const drumElements = DRUM_PAD.map((elem, index) =>
      <DrumPadElement key={elem.id} padId={elem.id} text={elem.btnText} src={elem.src}
      onClick={this.handleClick.bind(this, elem.btnText, elem.id)}
      play={this.state.isDrumPadPlaying[index]}
      onKeyDown={this.handleKeyDown.bind(this, elem.btnText)} />
    );*/
    const drumArray = DRUM_PAD.concat();

    return(

      <div id="drum-machine">
          <DrumDisplay nameOfClip={this.state.audioClip}/>

          <DrumPadElement padId={drumArray[0].id} text={drumArray[0].btnText} src={drumArray[0].src}
          onClick={this.handleClick.bind(this, drumArray[0].btnText, drumArray[0].id)}
          play={this.state.isDrumPadPlaying[0]} audioRef={this.audioElementQ}
          onKeyDown={this.handleKeyDown.bind(this, drumArray[0].btnText)} />
          <DrumPadElement padId={drumArray[1].id} text={drumArray[1].btnText} src={drumArray[1].src}
          onClick={this.handleClick.bind(this, drumArray[1].btnText, drumArray[1].id)}
          play={this.state.isDrumPadPlaying[1]} audioRef={this.audioElementW}
          onKeyDown={this.handleKeyDown.bind(this, drumArray[1].btnText)} />
          <DrumPadElement padId={drumArray[2].id} text={drumArray[2].btnText} src={drumArray[2].src}
          onClick={this.handleClick.bind(this, drumArray[2].btnText, drumArray[2].id)}
          play={this.state.isDrumPadPlaying[2]} audioRef={this.audioElementE}
          onKeyDown={this.handleKeyDown.bind(this, drumArray[2].btnText)} />

      </div>

    );
  }
}

class DrumPadElement extends React.Component {

/*  componentDidMount() {
      console.log(this.audioElem.current);
      console.log(this.props.play);
      let buttonPadElement = this.props.play;
      for( const prop in buttonPadElement) {
        if(prop === 'isPlaying' && buttonPadElement[prop] === true)
        {
          console.log('prop: ' + prop + ' : ' + buttonPadElement[prop]);
          this.audioElem.play();
        }
        else {
          this.audioElem.pause();
        }
      }
      if(this.props.play['isPlaying'] === true) {
        this.audioElem.play();
      }
      else {object
        this.audioElem.pause();
      }
  }*/


  render() {
    //console.log(this.props.play)
    let playDrumPad = this.props.play;
    console.log(playDrumPad);
    /*for (const prop in playDrumPad) {
      console.log(prop + " : " + typeof playDrumPad[prop] );
    }*/

    //console.log((padArray["0"]));
  //  console.log(Object.keys(playDrumPad));
    //console.log(playDrumPad.hasOwnProperty("id"));
    //let {id, isPlaying} = playDrumPad;

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
