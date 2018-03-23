$(document).ready(function() {


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
  let panelSound;

  let ctx = new AudioContext();
  let panelOneSound = new beepSound(ctx);
  let panelTwoSound = new beepSound(ctx);
  let panelThreeSound = new beepSound(ctx);
  let panelFourSound = new beepSound(ctx);

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

      switch(event.region) {
        case '1':

          panelOneSound.play(500);
          //shapeOneSound.play();
          drawShape(SHAPE_ARRAY[0], true);

          break;
        case '2':
          //alert('shape 2');

          panelTwoSound.play(200);
          //beepSound.setFrequency(200);
          //beepSound.start();
          //shapeTwoSound.play();
          drawShape(SHAPE_ARRAY[1], true);
          break;
        case '3':
          //alert('shape 3');

          panelThreeSound.play(350);
          //beepSound.setFrequency(350);
          //beepSound.start();
          //shapeThreeSound.play();
          drawShape(SHAPE_ARRAY[2], true);
          break;
        case '4':
          //alert('shape 4');

          panelFourSound.play(650);
          //beepSound.setFrequency(650);
          //beepSound.start();
          //shapeFourSound.play();
          drawShape(SHAPE_ARRAY[3],true);
          break;
      }
    }
  });

  document.getElementById('simonCanvas').addEventListener("mouseup", function(event) {
    if(event.region) {
      switch(event.region) {
        case '1':
          //alert('shape 1');
          panelOneSound.stop();
          //beepSound.stop();
          //shapeOneSound.stop();
          drawShape(SHAPE_ARRAY[0], false);

          break;
        case '2':
          //alert('shape 2');
          panelTwoSound.stop();
          //beepSound.stop();
          //shapeTwoSound.stop();
          drawShape(SHAPE_ARRAY[1], false);
          break;
        case '3':
          //alert('shape 3');
          panelThreeSound.stop();
          //beepSound.stop();
          //shapeThreeSound.stop();
          drawShape(SHAPE_ARRAY[2],false);
          break;
        case '4':
          //alert('shape 4');
          panelFourSound.stop();
          //beepSound.stop();
          //shapeFourSound.stop();
          drawShape(SHAPE_ARRAY[3], false);
          break;
      }
    }
  });

  var beepSound = function(context) {
    let audioContext = new AudioContext();
    this.context = context;
    let oscillator;
    //var oscillator = context.createOscillator();
    //var soundFrequency = 0;

    //oscillator.type = 'sine';
    //oscillator.frequency.value = soundFrequency;
    //oscillator.connect(context.destination);

    this.setup = function() {
      oscillator = context.createOscillator();
      oscillator.type = 'sine';
      oscillator.connect(context.destination);
    }

    this.play = function(frequency) {
      this.setup();
      oscillator.frequency.value = frequency;
      oscillator.start(0);
    }

    this.stop = function() {
      oscillator.stop();
    }

    /*return {
      setFrequency: function(value) {
        soundFrequency = value;
      },
      start: function() {
        oscillator.start(0);
      },
      stop: function() {
        oscillator.stop();
      }
    }*/

  };

  /*function beepSound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
      this.sound.play();
    }
    this.stop = function() {
      this.sound.pause();
      document.body.removeChild(this.sound);
    }
  }*/



});
