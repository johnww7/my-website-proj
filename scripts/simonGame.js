$(document).ready(function() {

  let canvas = document.getElementById('simonCanvas');
  let board = canvas.getContext('2d');
  let panelSound;
//#ff0000
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
    options: {type: 'sine', frequency: 550}

  });

  let shapeTwoSound = new Pizzicato.Sound({
    source: 'wave',
    options: {type: 'sine', frequency: 200}

  });

  let shapeThreeSound = new Pizzicato.Sound({
    source: 'wave',
    options: {type: 'sine', frequency: 300}

  });

  let shapeFourSound = new Pizzicato.Sound({
    source: 'wave',
    options: {type: 'sine', frequency: 750}

  });

  //drawSimonBoard();
  //setTimeout(drawHighlight, 5000);
  drawBoard();

  function drawBoard() {

    for(let i = 0; i < SHAPE_ARRAY.length; i++) {
      let keys = Object.keys(SHAPE_ARRAY[i]);
      let shapeStart = keys[2];
      let shapeLines = keys[3];
      let shapeArc = keys[4];
      let id = keys[0];
      let color = SHAPE_ARRAY[i]['color'][0];
      let startPoint = SHAPE_ARRAY[i][shapeStart];
      let lines = SHAPE_ARRAY[i][shapeLines];
      let arc = SHAPE_ARRAY[i][shapeArc];
      let regionID = SHAPE_ARRAY[i][id];

      console.log('spot: ' + i + ' id: ' + regionID + typeof regionID);
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
    console.log(color);

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
          //console.log('shape 1');
          //shapeOneSound.play();
          //panelSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
          //panelSound.loop = true;
          //panelSound.play();
          //beepSound();
          shapeOneSound.play();
          drawShape(SHAPE_ARRAY[0], true);

          break;
        case '2':
          //alert('shape 2');
          shapeTwoSound.play();
          drawShape(SHAPE_ARRAY[1], true);
          break;
        case '3':
          //alert('shape 3');
          shapeThreeSound.play();
          drawShape(SHAPE_ARRAY[2], true);
          break;
        case '4':
          //alert('shape 4');
          shapeFourSound.play();
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
          //shapeOneSound.stop();
          //panelSound.pause();
          shapeOneSound.stop();
          drawShape(SHAPE_ARRAY[0], false);

          break;
        case '2':
          //alert('shape 2');
          shapeTwoSound.stop();
          drawShape(SHAPE_ARRAY[1], false);
          break;
        case '3':
          //alert('shape 3');
          shapeThreeSound.stop();
          drawShape(SHAPE_ARRAY[2],false);
          break;
        case '4':
          //alert('shape 4');
          shapeFourSound.stop();
          drawShape(SHAPE_ARRAY[3], false);
          break;
      }
    }
  });

  function beepSound() {
    var audioContext = new AudioContext();
    var context = new AudioContext();
    var oscillator = context.createOscillator();

    oscillator.connect(context.destination);
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 3);
  }

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
