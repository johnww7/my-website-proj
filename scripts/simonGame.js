$(document).ready(function() {

  let simonSettings = (function() {
    let onOffValue = false;
    let startResetValue = false;
    let sequence = [];
    let playerMoves = [];
    let count = 0;
    let strictMode = false;

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
      resetSequence: function() {
        sequence.length = 0;
      },
      getCount: function() {
        return count;
      },
      resetCount: function() {
        count = 0;
      },
      setPlayer: function(move) {
        playerMoves.push(move);
      },
      getPlayer: function() {
        return playerMoves;
      },
      clearPlayer: function() {
        playerMoves.length = 0;
      },
      setStrict: function(mode) {
        strictMode = mode;
      },
      getStrict: function() {
        return strictMode;
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
    {'id': 1, 'color': ["#e97c7c", "#ff0000"],
    'arc1': [355, 345, 320, ((Math.PI/180) * 271.5), ((Math.PI/180) *358.5), false],
    'arc2': [355, 345, 160, ((Math.PI/180) * 357), ((Math.PI/180) *273), true]},
    {'id': 2, 'color': ["#4d44a9", "#0024ff"],
    'arc1': [355, 355, 320, ((Math.PI/180) * 1.5), ((Math.PI/180) *88.5), false],
    'arc2': [355, 355, 160, ((Math.PI/180) * 87), ((Math.PI/180) * 3), true]},
    {'id': 3, 'color': ["#3b8a3b", "#00ff00"],
    'arc1': [345, 355, 320, ((Math.PI/180) * 91.5), ((Math.PI/180) *178.5), false],
    'arc2': [345, 355, 160, ((Math.PI/180) * 177), ((Math.PI/180) *93), true]},
    {'id': 4, 'color': ["#ffffb8", "#ffff00"],
    'arc1': [345, 345, 320, ((Math.PI/180) * 181.5), ((Math.PI/180) *268.5), false],
    'arc2': [345, 345, 160, ((Math.PI/180) * 267), ((Math.PI/180) *183), true]}
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
  let timeOut;
  let displayMoves;
  let endHighLight;

  //drawSimonBoard();
  //setTimeout(drawHighlight, 5000);
  drawBoard();
  //drawLines();

  function drawBoard() {

    for(let i = 0; i < SHAPE_ARRAY.length; i++) {
      console.log(SHAPE_ARRAY[i]);
      drawShape(SHAPE_ARRAY[i], false);
    }
  }

  function drawLines() {
  	//vertical Lines
    board.beginPath();
    board.moveTo(338, 25);
    board.lineTo(338, 675);
    board.strokeStyle = "red";
    board.stroke();

    board.beginPath();
    board.moveTo(362, 25);
    board.lineTo(362, 675);
    board.strokeStyle = "red";
    board.stroke();

		//Horizontal Lines
    board.beginPath();
    board.moveTo(25, 338);
    board.lineTo(675, 338);
    board.strokeStyle = "red";
    board.stroke();

    board.beginPath();
    board.moveTo(25, 362);
    board.lineTo(675, 362);
    board.strokeStyle = "red";
    board.stroke();

    board.beginPath();
    board.arc(350, 350, 150, ((Math.PI/180) * 0), ((Math.PI/180) *360));
    board.strokeStyle = 'red';
    board.stroke();
  }

  function drawShape(shapeObj, hightLight){
    let keys = Object.keys(shapeObj);
    let arcOne = keys[2];
    let arcTwo = keys[3];
    let id = keys[0];
    let arc1 = shapeObj[arcOne];
    let arc2 = shapeObj[arcTwo];
    let regionID = shapeObj[id];
    let color = '';

    if(hightLight === true) {
      color = shapeObj['color'][1];
    }
    else {
      color = shapeObj['color'][0];
    }

    /*console.log(' id: ' + regionID + typeof regionID);
    console.log('key: ' + keys + ' keyNames: ' + shapeStart + ', ' + shapeLines + ', ' +
    shapeArc);
    console.log('color: ' + color);
    console.log(startPoint);
    console.log(lines);
    console.log(arc);
    console.log('------------------------');*/

    board.beginPath();
    board.arc(arc1[0], arc1[1], arc1[2], arc1[3], arc1[4], arc1[5]);
    board.arc(arc2[0], arc2[1], arc2[2], arc2[3], arc2[4], arc2[5]);
    board.closePath();

    board.fillStyle = color;
    board.fill();
    board.addHitRegion({id: regionID});

  }

  document.getElementById('simonCanvas').addEventListener("mousedown", function(event) {
    if (event.region) {
    //  if(simonSettings.getOnOffVal() === true && simonSettings.getStartReset() === true){
    if(simonSettings.getStartReset() === true){
        switch(event.region) {
          case '1':
            beepSound.setFrequency(500);
            beepSound.start();
            //shapeOneSound.play();
            drawShape(SHAPE_ARRAY[0], true);
            stopTimeOut();
            simonSettings.setPlayer(1);
            playerMove(1);
            break;
          case '2':
            //alert('shape 2');
            beepSound.setFrequency(200);
            beepSound.start();
            //shapeTwoSound.play();
            drawShape(SHAPE_ARRAY[1], true);
            stopTimeOut();
            simonSettings.setPlayer(2);
            playerMove(2);
            break;
          case '3':
            //alert('shape 3');
            beepSound.setFrequency(350);
            beepSound.start();
            //shapeThreeSound.play();
            drawShape(SHAPE_ARRAY[2], true);
            stopTimeOut();
            simonSettings.setPlayer(3);
            playerMove(3);
            break;
          case '4':
            //alert('shape 4');
            beepSound.setFrequency(650);
            beepSound.start();
            //shapeFourSound.play();
            drawShape(SHAPE_ARRAY[3],true);
            stopTimeOut();
            simonSettings.setPlayer(4);
            playerMove(4);
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
      //if(simonSettings.getOnOffVal() === true && simonSettings.getStartReset() === true){
      if(simonSettings.getStartReset() === true){
        switch(event.region) {
          case '1':
            //alert('shape 1');
            beepSound.stop();
            //shapeOneSound.stop();
            drawShape(SHAPE_ARRAY[0], false);
          //  timeOut = setTimeout(timedOut, 5000);
            break;
          case '2':
            //alert('shape 2');
            beepSound.stop();
            //shapeTwoSound.stop();
            drawShape(SHAPE_ARRAY[1], false);
            //timeOut = setTimeout(timedOut, 5000);
            break;
          case '3':
            //alert('shape 3');
            beepSound.stop();
            //shapeThreeSound.stop();
            drawShape(SHAPE_ARRAY[2],false);
            //timeOut = setTimeout(timedOut, 5000);
            break;
          case '4':
            //alert('shape 4');
            beepSound.stop();
            //shapeFourSound.stop();
            drawShape(SHAPE_ARRAY[3], false);
            //timeOut = setTimeout(timedOut, 5000);
            break;
        }
      }
      else {
        console.log('Start game');
      }
    }

  });

  document.querySelector('input[name=onoffswitch]').addEventListener('change', function(e) {
    if(this.checked) {
      simonSettings.setOnOffVal(true);
      count.innerHTML = '--';
      console.log('on: ' + simonSettings.getOnOffVal());
    }
    else {
      simonSettings.setOnOffVal(false);
      document.getElementById('count').innerHTML = ' ';
      resetGame();
      simonSettings.setStrict(false);
      let strictButton = document.getElementById('strictBtn').classList;
      strictButton.remove('strict-btn-color-on');
      strictButton.add('strict-btn-color-off');
      console.log('off: ' + simonSettings.getOnOffVal());
    }
  });



  document.getElementById('startBtn').addEventListener('click', function() {
    // && count.innerHTML === '--'
    if(simonSettings.getOnOffVal() === true && (count.innerHTML === '--' || simonSettings.getStartReset() === true) ) {
      //simonSettings.setStartReset(true);
      console.log(simonSettings.getStartReset());
      console.log(count.innerHTML + ' ' + typeof count.innerHTML);
      resetGame();

      //start game
      setTimeout(displayBlank, 500);
      setTimeout(displayEmptySign, 1000);
      setTimeout(displayBlank, 1500);
      setTimeout(displayEmptySign, 2000);
      console.log('start sequence');
      //beepSound.stop();
      //console.log(Object.keys(SHAPE_ARRAY[0]));
      //console.log(SHAPE_ARRAY[0]['id']);
      setTimeout(simonSays, 2500);

    }
    else if(simonSettings.getOnOffVal() === true && simonSettings.getStartReset() === false) {
      //count.innerHTML = '--';
      //Reset count and start sequence again
      console.log('reset game');
      beepSound.stop();
      resetGame();
      setTimeout(simonSays, 2000);
    }
    else {
      console.log('Turn game on');
    }

  });

  document.getElementById('strictBtn').addEventListener('click', function() {
    let strictButton = document.getElementById('strictBtn').classList;

    if(simonSettings.getOnOffVal() === true) {
      if(simonSettings.getStrict() === false){
        simonSettings.setStrict(true);
        //Change button color
        strictButton.remove('strict-btn-color-off');
        strictButton.add('strict-btn-color-on');
      }
      else {
        simonSettings.setStrict(false);
        //change button color
        strictButton.remove('strict-btn-color-on');
        strictButton.add('strict-btn-color-off');
      }
    }
      console.log('strict mode: ' + simonSettings.getStrict());
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

  function resetGame() {
    simonSettings.clearPlayer();
    simonSettings.resetCount();
    simonSettings.resetSequence();
    clearInterval(displayMoves);
    clearInterval(endHighLight);
    clearInterval(timeOut);
    //beepSound.stop();
    count.innerHTML = '--';
    simonSettings.setStartReset(false);
    drawBoard();
  }


  let stoppedTimer = false;

  function simonSays() {
    let gameCount = simonSettings.getCount();
    //Check for count =21
    //simonSettings.setStartReset(false);
    if(gameCount === 20) {
    	return;
    }

    //Start sequence generator
    generateSequence();

    //set count display
    let tempCount = count.innerHTML;
    console.log('Count: ' + tempCount + ' :' + typeof(tempCount));
    setCountDisplay(tempCount);

    //Display sequence to player
    presentSequence();

  }

  function generateSequence() {
    let nextSequence = Math.floor(Math.random()*(4-1+1) + 1);

    simonSettings.setNextSeq(nextSequence);
  }

  function setCountDisplay(count) {
    if(count === '--' && typeof(count) === 'string') {
      document.getElementById('count').innerHTML = '01';
      console.log('started count: ' + count.innerHTML);
      return;
    }

    let tempCount = parseInt(count);
    let newCount = 0;
    console.log('current count: ' + tempCount);
    if(tempCount >= 1 && tempCount <= 9) {
      newCount = simonSettings.getCount();
      console.log('new count: ' + newCount);
      document.getElementById('count').innerHTML = '0' + newCount;
    }
    else if(tempCount >= 10) {
      newCount = simonSettings.getCount();
      console.log('new count: ' + newCount);
      document.getElementById('count').innerHTML = newCount;
    }
    else {
      alert('Error!');
    }
    return;
  }

  function presentSequence() {
    let sequenceArray = simonSettings.getSequence();
    let count = 0;
    let startClock = false;

    //simonSettings.setStartReset(false);
    displayMoves = setInterval(function() {
      simonSettings.setStartReset(false);
      highLightSequence(sequenceArray[count], true);
      count++;
      console.log(sequenceArray);
      if(count >= sequenceArray.length) {
        clearInterval(displayMoves);
        simonSettings.clearPlayer();
        //simonSettings.setStartReset(true);
        console.log('start timer');
        //timeOut = setTimeout(timedOut, 5000);
        setTimeout(timedOut, 900);
      }

    }, 1000);

  //  console.log('Presenting sequence done');
    //return true;
  }

  function playerMove(move) {
    let playerMoves = simonSettings.getPlayer();
    let sequence = simonSettings.getSequence();
    let strictMode = simonSettings.getStrict();
    let currCount = document.getElementById('count').textContent;


    if(playerMoves[playerMoves.length - 1] !== sequence[playerMoves.length - 1]) {
      //Create wrong move function
      console.log('Wrong move');
      if(strictMode === true) {
        stopTimeOut();
        beepSound.stop();
        simonSettings.setStartReset(false);
        drawBoard();
        resetGame();
        wrongMoveDisplay();

        setTimeout(simonSays, 2000);

      }
      else {
        stopTimeOut();
        beepSound.stop();
        simonSettings.setStartReset(false);
        drawBoard();

        console.log('current: ' + currCount);
        wrongMoveDisplay();
        setTimeout(function(){count.innerHTML = currCount; }, 1900);
        setTimeout(presentSequence, 2000);
      }
    }
    else {
      if(playerMoves.length == sequence.length) {
        simonSettings.clearPlayer();
        console.log(simonSettings.getPlayer());
      //  simonSettings.setStartReset(false);
      setTimeout(simonSettings.setStartReset, 500, false);
        setTimeout(simonSays, 1000);
      }
      else {
        console.log('Right move: ' + playerMoves[playerMoves.length-1]);
        //timeOut = setTimeout(timedOut, 5000);
        stopTimeOut();
        timedOut();
      }
    }
  }

  function highLightSequence(id, highlight) {
    //let sequenceArray = simonSettings.getSequence();
    let shapeValue = 0;

      switch(id) {
        case 1:
          beepSound.setFrequency(500);
          beepSound.start();
          shapeValue = 0;
          drawShape(SHAPE_ARRAY[0], highlight);
          break;
        case 2:
          beepSound.setFrequency(200);
          beepSound.start();
          shapeValue = 1;
          drawShape(SHAPE_ARRAY[1], highlight);
          break;
        case 3:
          beepSound.setFrequency(350);
          beepSound.start();
          shapeValue = 2;
          drawShape(SHAPE_ARRAY[2], highlight);
          break;
        case 4:
          beepSound.setFrequency(650);
          beepSound.start();
          shapeValue = 3;
          drawShape(SHAPE_ARRAY[3],highlight);
          break;
        default:
          console.log('Error occured');

      }
      endHighLight = setTimeout(function() {
        beepSound.stop();
        drawShape(SHAPE_ARRAY[shapeValue], !highlight);
      }, 800);

    return;
  }

  function stopSequence(shape, light) {
    let second = 1000;
    let counter = 0;
    let interval = 2 * second;

    let stopTimeout = setInterval(function() {
      counter = (counter + second) % interval;

      if(counter == 0) {
        drawShape(shape, light);
        //beepSound.stop();
        clearInterval(stopTimeout);
      }
    }, second);
    return;
  }

  function timedOut() {
    let currentCount = count.innerHTML;
    let errorCount = 0;

    simonSettings.setStartReset(true);
    timeOut =  setTimeout(function() {
      simonSettings.setStartReset(false);
      setTimeout(displayBlank, 300);
      setTimeout(displayErrorSign, 600);
      setTimeout(displayBlank, 900);
      setTimeout(displayErrorSign, 1200);
      setTimeout(function() { document.getElementById('count').innerHTML = currentCount},1600);
      setTimeout(presentSequence, 2500);
    }, 4500);

  }

  function wrongMoveDisplay() {
    let count = 0;
    let toggle = false;
    beepSound.setFrequency(525);
    beepSound.start();
    let displayError = setInterval(function() {
      if(toggle) {
        displayErrorSign();
        toggle = false;
      }
      else {
        displayBlank();
        toggle = true;
      }
      count++;
      if(count >= 8) {
        clearInterval(displayError);
        beepSound.stop();
        displayEmptySign();
      }
    }, 200);
    return;
  }

  function stopTimeOut() {
    clearTimeout(timeOut);
    //stoppedTimer = true;
  }

});
