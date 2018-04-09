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
    let soundPlaying = false;

    return {
      setFrequency: function(value) {
        oscillator = context.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = value;
      },
      start: function() {
        soundPlaying = true;
        oscillator.connect(context.destination);
        oscillator.start(0);

      },
      stop: function() {
        soundPlaying = false;
        oscillator.stop();
        oscillator.disconnect(context.destination);
        oscillator = null;
      },
      getSound: function() {
        return soundPlaying;
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


  //cached elements and global variables
  let canvas = document.getElementById('simonCanvas');
  let board = canvas.getContext('2d');
  let count = document.getElementById('count');

  //Global variables for setInterval and setTimeout functions
  let panelSound;
  let timeOut;
  let displayMoves;
  let endHighLight;

  //Draw simon board as soon as page is opened
  drawBoard();

  //Draws all four panels for simon board.
  function drawBoard() {
    for(let i = 0; i < SHAPE_ARRAY.length; i++) {
      console.log(SHAPE_ARRAY[i]);
      drawShape(SHAPE_ARRAY[i], false);
    }
  }

  //------------------------------------------------------------------------
  //Draws a simon board panel specified from the shapeObj parameter, and decides
  //what color it will be based on highLight parameter value.
  //--------------------------------------------------------------------------
  function drawShape(shapeObj, highLight){
    let keys = Object.keys(shapeObj);
    let arcOne = keys[2];
    let arcTwo = keys[3];
    let id = keys[0];
    let arc1 = shapeObj[arcOne];
    let arc2 = shapeObj[arcTwo];
    let regionID = shapeObj[id];
    let color = '';

    if(highLight === true) {
      color = shapeObj['color'][1];
    }
    else {
      color = shapeObj['color'][0];
    }

    //Draws panel shape on board canvas.
    board.beginPath();
    board.arc(arc1[0], arc1[1], arc1[2], arc1[3], arc1[4], arc1[5]);
    board.arc(arc2[0], arc2[1], arc2[2], arc2[3], arc2[4], arc2[5]);
    board.closePath();

    board.fillStyle = color;
    board.fill();
    board.addHitRegion({id: regionID});

  }

  //--------------------------------------------------------------------------
  //Mousedown event listener attached to canvas element, when certain region on canvas
  //is pressed down on, and getStartReset from simonSettings closure is true. Sets
  //frequency and plays sound from beepSound closure, redraws shape region, stops
  //timeout clock, adds region to player moves array and calls playerMove function.
  //-------------------------------------------------------------------------------
  document.getElementById('simonCanvas').addEventListener("mousedown", function(event) {
    if (event.region) {
    if(simonSettings.getStartReset() === true){
        switch(event.region) {
          case '1':
            beepSound.setFrequency(500);
            beepSound.start();
            drawShape(SHAPE_ARRAY[0], true);
            stopTimeOut();
            simonSettings.setPlayer(1);
            playerMove(1);
            break;
          case '2':
            beepSound.setFrequency(200);
            beepSound.start();
            drawShape(SHAPE_ARRAY[1], true);
            stopTimeOut();
            simonSettings.setPlayer(2);
            playerMove(2);
            break;
          case '3':
            beepSound.setFrequency(350);
            beepSound.start();
            drawShape(SHAPE_ARRAY[2], true);
            stopTimeOut();
            simonSettings.setPlayer(3);
            playerMove(3);
            break;
          case '4':
            beepSound.setFrequency(650);
            beepSound.start();
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

  //-------------------------------------------------------------------------
  //Mouseup event listener attached to canvas element with id 'simonCanvas', when shape
  //region on canvas has mouseup event performed on it, and getStartReset is true. Call
  //made to drawshape function to redraw that shape, and if beep sound is playing then
  //sound is stopped.
  //------------------------------------------------------------------------
  document.getElementById('simonCanvas').addEventListener("mouseup", function(event) {
    if(event.region) {
      if(simonSettings.getStartReset() === true){
        switch(event.region) {
          case '1':
            drawShape(SHAPE_ARRAY[0], false);
            break;
          case '2':
            drawShape(SHAPE_ARRAY[1], false);
            break;
          case '3':
            drawShape(SHAPE_ARRAY[2],false);
            break;
          case '4':
            drawShape(SHAPE_ARRAY[3], false);
            break;
        }
        if(beepSound.getSound() === true) {
          beepSound.stop();
        }
      }
      else {
        console.log('Start game');
      }
    }

  });

  //---------------------------------------------------------------------------
  //Change event listener attached to input switch element, when checked game is turned on,
  //and when switched off game is turned off with game settings and display reseted.
  //-------------------------------------------------------------------------
  document.querySelector('input[name=onoffswitch]').addEventListener('change', function(e) {
    if(this.checked) {
      simonSettings.setOnOffVal(true);
      count.innerHTML = '--';
    }
    else {
      simonSettings.setOnOffVal(false);
      resetGame();
      simonSettings.setStrict(false);
      let strictButton = document.getElementById('strictBtn').classList;
      strictButton.remove('strict-btn-color-on');
      strictButton.add('strict-btn-color-off');
      document.getElementById('count').innerHTML = '';
    }
  });

  //----------------------------------------------------------------------------
  //Click event listener attached to button with id 'startBtn'. When clicked starts the game
  //after some flashing in counter display, and if pressed again resets the game.
  //---------------------------------------------------------------------------
  document.getElementById('startBtn').addEventListener('click', function() {
    if(simonSettings.getOnOffVal() === true && (count.innerHTML === '--' || simonSettings.getStartReset() === true) ) {
      resetGame();
      //start game
      setTimeout(displayBlank, 500);
      setTimeout(displayEmptySign, 1000);
      setTimeout(displayBlank, 1500);
      setTimeout(displayEmptySign, 2000);

      setTimeout(simonSays, 2500);

    }
    else if(simonSettings.getOnOffVal() === true && simonSettings.getStartReset() === false) {
      //Reset count and start sequence again
      resetGame();
      setTimeout(simonSays, 2000);
    }
    else {
      console.log('Turn game on');
    }

  });

  //---------------------------------------------------------------------
  //Click event listener attached to button with id 'strictBtn'. When clicked and game
  //has been turned on, sets game to strict mode and button changes color. If pressed again
  //and game is on, turns off strict mode and reverts button color to default.
  //---------------------------------------------------------------------
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
  });

  //Count display text set to blank
  function displayBlank() {
    count.innerHTML = ' ';
  }

  //count display text set to '--'
  function displayEmptySign() {
    count.innerHTML = '--';
  }

  //count display text set to '!!'
  function displayErrorSign() {
    count.innerHTML= '!!';
  }

  //Resets count and settings, stops timers, sounds and sets count display to '--'
  function resetGame() {
    simonSettings.clearPlayer();
    simonSettings.resetCount();
    simonSettings.resetSequence();
    clearInterval(endHighLight);
    clearInterval(timeOut);
    stopSequence();
    if(beepSound.getSound() === true) {
      beepSound.stop();
    }
    count.innerHTML = '--';
    simonSettings.setStartReset(false);
    drawBoard();
  }

  //----------------------------------------------------------------------
  //Function generates sequence to be played, sets display count and presents game
  //sequence to player.
  //----------------------------------------------------------------------
  function simonSays() {
    let gameCount = simonSettings.getCount();

    //Start sequence generator
    generateSequence();

    //set count display
    let tempCount = count.innerHTML;
    setCountDisplay(tempCount);

    //Display sequence to player
    presentSequence();
  }

  //----------------------------------------------------------------------
  //Presents player winning animation on game board, count display and sound. Then
  //resets game, alerts player of win and then restarts game.
  //-----------------------------------------------------------------------
  function playerWins() {
    let winSequence = [1, 2, 3, 4, 1, 2, 3, 4];
    let count = 0;
    let gameCount = simonSettings.getCount();

    let winDisplay = setInterval(function() {
      simonSettings.setStartReset(false);
      highLightSequence(winSequence[count], true, 300);
      if(count == 0 || (count % 2) ==0) {
        document.getElementById('count').innerHTML = '!!';
      }
      else {
        document.getElementById('count').innerHTML = gameCount;
      }
      count++;

      if(count >= winSequence.length) {
        clearInterval(winDisplay);
        simonSettings.setStartReset(false);
        resetGame();
        alert('You Won!');
        setTimeout(simonSays, 2000);
      }

    }, 500);

  }

  //Randomly generates next sequence number between the number 1-4
  function generateSequence() {
    let nextSequence = Math.floor(Math.random()*(4-1+1) + 1);

    simonSettings.setNextSeq(nextSequence);
  }

  //Increases count display element by 1 each time function is called
  function setCountDisplay(count) {
    if(count === '--' && typeof(count) === 'string') {
      document.getElementById('count').innerHTML = '01';
      return;
    }

    let tempCount = parseInt(count);
    let newCount = 0;
    if(tempCount >= 1 && tempCount <= 9) {
      newCount = simonSettings.getCount();
      document.getElementById('count').innerHTML = '0' + newCount;
    }
    else if(tempCount >= 10) {
      newCount = simonSettings.getCount();
      document.getElementById('count').innerHTML = newCount;
    }
    else {
      alert('Error!');
    }
    return;
  }

  //---------------------------------------------------------------
  //Presents simon moves sequence to player on game board and then starts
  //game clock timer.
  //-----------------------------------------------------------------
  function presentSequence() {
    let sequenceArray = simonSettings.getSequence();
    let count = 0;
    let startClock = false;

    displayMoves = setInterval(function() {
      simonSettings.setStartReset(false);
      highLightSequence(sequenceArray[count], true, 800);
      count++;
      if(count >= sequenceArray.length) {
        clearInterval(displayMoves);
        simonSettings.clearPlayer();
        setTimeout(timedOut, 900);
      }
    }, 1000);
  }



  function playerMove(move) {
    let playerMoves = simonSettings.getPlayer();
    let sequence = simonSettings.getSequence();
    let strictMode = simonSettings.getStrict();
    let currCount = document.getElementById('count').textContent;


    if(playerMoves[playerMoves.length - 1] !== sequence[playerMoves.length - 1]) {
      //Create wrong move function
      if(strictMode === true) {
        stopTimeOut();
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
        wrongMoveDisplay();
        setTimeout(function(){count.innerHTML = currCount; }, 1900);
        setTimeout(presentSequence, 2000);
      }
    }
    else {
     if(playerMoves.length == sequence.length && simonSettings.getCount() === 20) {
        playerWins();
      }
      else if(playerMoves.length == sequence.length) {
        simonSettings.clearPlayer();
      setTimeout(function(){
        simonSettings.setStartReset(false);
        if(beepSound.getSound() === true){
          beepSound.stop();
          drawBoard();
        }
      }, 500);
      setTimeout(simonSays, 1000);
      }
      else {
        stopTimeOut();
        timedOut();
      }
    }
  }

  function highLightSequence(id, highlight, time) {
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
      }, time);

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
      if(beepSound.getSound() === true) {
        beepSound.stop();
        drawBoard();
      }
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

  //Stops setInterval timer for displayMoves function
  function stopSequence() {
    clearInterval(displayMoves);
  }

  //Stops setTimeout timer for timeOut function
  function stopTimeOut() {
    clearTimeout(timeOut);
  }

});
