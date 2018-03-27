$(document).ready(function() {

  let simonSettings = (function() {
    let onOffValue = false;
    let startResetValue = false;
    let sequence = [];
    let count = 0;

    return {
      setOnOffVal:  function(value) {
        onOffValue = value;
      },
      getOnOffVal: function() {
        return onOffValue;
      },
      setStartReset: function(value) {
        startResetValue = value;
      },
      getStartReset: function() {
        return startResetValue;
      },
      setNextSeq: function(num) {
        sequence.push(num);
        count = sequence.length;
      },
      getSequence: function() {
        return sequence;
      },
      getCount: function() {
        return count;
      }
    }

  })()

  var beepSound = (function() {
    let audioContext = new AudioContext();
    let context = new AudioContext();
    let oscillator = null;

    return {
      setFrequency: function(value) {
        oscillator = context.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = value;
      },
      start: function() {
        oscillator.connect(context.destination);
        oscillator.start(0);
      },
      stop: function() {
        oscillator.stop();
        oscillator.disconnect(context.destination);
        oscillator = null;
      },
      timedStart: function() {
        oscillator.connect(context.destination);
        let now = context.currentTime;
        oscillator.start(now);
        oscillator.stop(now + 1);
        oscillator.disconnect(context.destination);
        oscillator =  null;
      }
    }

  })()


  const SHAPE_ARRAY = [
    {'id': 1, 'color': ["#e97c7c", "#ff0000"], 'start': [355,25],'lines': [355, 345, 675, 345],
    'arc': [355, 345, 320, ((Math.PI/180) * 270), ((Math.PI/180) *360)]},
    {'id': 2, 'color': ["#4d44a9", "#0024ff"], 'start': [355,675],'lines': [355, 355, 675, 355],
    'arc': [355, 355, 320, ((Math.PI/180) * 360), ((Math.PI/180) *90)]},
    {'id': 3, 'color': ["#3b8a3b", "#00ff00"], 'start': [345,675],'lines': [345, 355, 25, 355],
    'arc': [345, 355, 320, ((Math.PI/180) * 90), ((Math.PI/180) *180)]},
    {'id': 4, 'color': ["#ffffb8", "#ffff00"], 'start': [345,25],'lines': [345, 345, 25, 345],
    'arc': [345, 345, 320, ((Math.PI/180) * 180), ((Math.PI/180) *270)]}
  ];

  let shapeOneSound = new Pizzicato.Sound({
    source: 'wave',
    options: {type: 'sine', frequency: 500}

  });

  let shapeTwoSound = new Pizzicato.Sound({
    source: 'wave',
    options: {type: 'sine', frequency: 200}

  });

  let shapeThreeSound = new Pizzicato.Sound({
    source: 'wave',
    options: {type: 'sine', frequency: 350}

  });

  let shapeFourSound = new Pizzicato.Sound({
    source: 'wave',
    options: {type: 'sine', frequency: 650}

  });

  //cached elements and global variables
  let canvas = document.getElementById('simonCanvas');
  let board = canvas.getContext('2d');
  let count = document.getElementById('count');
  let panelSound;


  //drawSimonBoard();
  //setTimeout(drawHighlight, 5000);
  drawBoard();

  function drawBoard() {

    for(let i = 0; i < SHAPE_ARRAY.length; i++) {
      console.log(SHAPE_ARRAY[i]);
      drawShape(SHAPE_ARRAY[i], false);
    }
  }

  function drawShape(shapeObj, hightLight){
    let keys = Object.keys(shapeObj);
    let shapeStart = keys[2];
    let shapeLines = keys[3];
    let shapeArc = keys[4];
    let id = keys[0];
    let startPoint = shapeObj[shapeStart];
    let lines = shapeObj[shapeLines];
    let arc = shapeObj[shapeArc];
    let regionID = shapeObj[id];
    let color = '';

    if(hightLight === true) {
      color = shapeObj['color'][1];
    }
    else {
      color = shapeObj['color'][0];
    }
    //board.clearRect(arc[0], arc[1], arc[0]+320, arc[1]+320);
    //board.clearRect(0, 0, canvas.width, canvas.height);

    console.log(' id: ' + regionID + typeof regionID);
    console.log('key: ' + keys + ' keyNames: ' + shapeStart + ', ' + shapeLines + ', ' +
    shapeArc);
    console.log('color: ' + color);
    console.log(startPoint);
    console.log(lines);
    console.log(arc);
    console.log('------------------------');

    board.beginPath();
    board.moveTo(startPoint[0], startPoint[1]);
    board.lineTo(lines[0], lines[1]);
    board.lineTo(lines[2], lines[3]);
    board.arc(arc[0], arc[1], arc[2], arc[3], arc[4]);

    board.fillStyle = color;
    board.fill();
    board.addHitRegion({id: regionID});

  }

  document.getElementById('simonCanvas').addEventListener("mousedown", function(event) {
    if (event.region) {
      if(simonSettings.getOnOffVal() === true && simonSettings.getStartReset() === true){
        switch(event.region) {
          case '1':
            beepSound.setFrequency(500);
            beepSound.start();
            //shapeOneSound.play();
            drawShape(SHAPE_ARRAY[0], true);

            break;
          case '2':
            //alert('shape 2');
            beepSound.setFrequency(200);
            beepSound.start();
            //shapeTwoSound.play();
            drawShape(SHAPE_ARRAY[1], true);
            break;
          case '3':
            //alert('shape 3');
            beepSound.setFrequency(350);
            beepSound.start();
            //shapeThreeSound.play();
            drawShape(SHAPE_ARRAY[2], true);
            break;
          case '4':
            //alert('shape 4');
            beepSound.setFrequency(650);
            beepSound.start();
            //shapeFourSound.play();
            drawShape(SHAPE_ARRAY[3],true);
            break;
        }
      }
      else {
        console.log('start game');
      }
    }

  });

  document.getElementById('simonCanvas').addEventListener("mouseup", function(event) {
    if(event.region) {
      if(simonSettings.getOnOffVal() === true && simonSettings.getStartReset() === true){
        switch(event.region) {
          case '1':
            //alert('shape 1');
            beepSound.stop();
            //shapeOneSound.stop();
            drawShape(SHAPE_ARRAY[0], false);

            break;
          case '2':
            //alert('shape 2');
            beepSound.stop();
            //shapeTwoSound.stop();
            drawShape(SHAPE_ARRAY[1], false);
            break;
          case '3':
            //alert('shape 3');
            beepSound.stop();
            //shapeThreeSound.stop();
            drawShape(SHAPE_ARRAY[2],false);
            break;
          case '4':
            //alert('shape 4');
            beepSound.stop();
            //shapeFourSound.stop();
            drawShape(SHAPE_ARRAY[3], false);
            break;
        }
      }
      else {
        console.log('Start game');
      }
    }

  });

  document.getElementById('myonoffswitch').addEventListener('change', function(e) {
    if(this.checked) {

      simonSettings.setOnOffVal(true);
      count.innerHTML = '--';
      console.log('on: ' + simonSettings.getOnOffVal());
    }
    else {

      simonSettings.setOnOffVal(false);
      count.innerHTML = '00';
      console.log('off: ' + simonSettings.getOnOffVal());
    }
  });



  document.getElementById('startBtn').addEventListener('click', function() {

    if(simonSettings.getOnOffVal() === true && count.innerHTML === '--') {
      simonSettings.setStartReset(true);
      console.log(simonSettings.getStartReset());
      console.log(count.innerHTML + ' ' + typeof count.innerHTML);

      //start game
      setTimeout(displayBlank, 500);
      setTimeout(displayEmptySign, 1000);
      setTimeout(displayBlank, 1500);
      setTimeout(displayEmptySign, 2000);
      console.log('start sequence');

      //console.log(Object.keys(SHAPE_ARRAY[0]));
      console.log(SHAPE_ARRAY[0]['id']);
      //simonSays();

    }
    else if(simonSettings.getOnOffVal() === true) {
      count.innerHTML = '--';

      //Reset count and start sequence again

    }
    else {
      console.log('Turn game on');
    }

  });

  function displayBlank() {
    count.innerHTML = ' ';
  }

  function displayEmptySign() {
    //count.innerHTML = '';
    count.innerHTML = '--';
  }

  function displayErrorSign() {
    count.innerHTML= '!!';
  }

  let timeOut;
  let stoppedTimer = false;

  function simonSays() {

    //Check for count =21

    //Start sequence generator
    generateSequence();

    //set count display
    let tempCount = count.innerHTML;
    setCountDisplay(tempCount);

    //Display sequence to player
    presentSequence();

    //start time out clock for waiting for input
    timeOut = setInterval(timedOut, 4000);

    if(stoppedTimer = true) {

    }
  }

  function generateSequence() {
    let nextSequence = Math.floor(Math.random()*(4-1+1) + 1);

    simonSettings.setNextSeq(nextSequence);
  }

  function setCountDisplay(count) {
    if(count === '--' && typeof(count) === 'string') {
      count.innerHTML = '01';
      return;
    }

    let tempCount = parseInt(count);
    let newCount = 0;
    if(tempCount >= 1 && tempCount <= 9) {
      newCount = simonSettings.getCount();
      count.innerHTML = '0' + newCount;
    }
    else if(tempCount >= 10) {
      newCount = simonSettings.getCount();
      count.innerHTML = newCount;
    }
    else {
      alert('Error!');
    }
    return;
  }

  function presentSequence() {
    let sequenceArray = simonSettings.getSequence();

    for(let index = 0; index < sequenceArray.length; index++) {
      switch(sequenceArray[index]) {
        case 1:
          beepSound.setFrequency(500);
          beepSound.timedStart();
          drawShape(SHAPE_ARRAY[0], true);
          setTimeout(drawShape, 1000, SHAPE_ARRAY[0], false);
          break;
        case 2:
          beepSound.setFrequency(200);
          beepSound.timedStart();
          drawShape(SHAPE_ARRAY[1], true);
          setTimeout(drawShape, 1000, SHAPE_ARRAY[1], false);
          break;
        case 3:
          beepSound.setFrequency(350);
          beepSound.timedStart();
          drawShape(SHAPE_ARRAY[2], true);
          setTimeout(drawShape, 1000, SHAPE_ARRAY[2], false);
          break;
        case 4:
          beepSound.setFrequency(650);
          beepSound.timedStart();
          drawShape(SHAPE_ARRAY[3],true);
          setTimeout(drawShape, 1000, SHAPE_ARRAY[3], false);
          break;
        default:
          console.log('Error occured');

      }
    }
    return;
  }

  function timedOut() {
    let currentCount = count.innerHTML;

    beepSound.setFrequency(1000);
    beepSound.start();
    setTimeout(beepSound.stop, 2000);

    count.innerHTML = ' ';
    setTimeout(displayErrorSign, 500);
    setTimeout(displayBlank, 1000);
    setTimeout(displayErrorSign,1500);
    setTimeout(function(){count.innerHTML = currentCount;}, 2200);

    presentSequence();

    timeOut = setInterval(timedOut, 4000);

  }

  function stopTimeOut() {
    clearTimeout(timeOut);
    stoppedTimer = true;
  }

});
