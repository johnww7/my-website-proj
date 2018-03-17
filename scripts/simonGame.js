$(document).ready(function() {

  let canvas = document.getElementById('simonCanvas');
  let board = canvas.getContext('2d');

  const SHAPE_ARRAY = [
    {'id': 1, 'color': ["rgba(250, 5, 5, 0.5)", "#ff0000"], 'start': [355,25],'lines': [355, 345, 675, 345],
    'arc': [355, 345, 320, ((Math.PI/180) * 270), ((Math.PI/180) *360)]},
    {'id': 2, 'color': ["#4d44a9", "#0024ff"], 'start': [355,675],'lines': [355, 355, 675, 355],
    'arc': [355, 355, 320, ((Math.PI/180) * 360), ((Math.PI/180) *90)]},
    {'id': 3, 'color': ["#3b8a3b", "#00ff00"], 'start': [345,675],'lines': [345, 355, 25, 355],
    'arc': [345, 355, 320, ((Math.PI/180) * 90), ((Math.PI/180) *180)]},
    {'id': 4, 'color': ["rgba(255, 255, 0, 0.5)", "#ffff00"], 'start': [345,25],'lines': [345, 345, 25, 345],
    'arc': [345, 345, 320, ((Math.PI/180) * 180), ((Math.PI/180) *270)]}
  ];

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

  document.getElementById('simonCanvas').addEventListener("click", function(event) {
    if (event.region) {

      switch(event.region) {
        case '1':
          alert('shape 1');
          break;
        case '2':
          alert('shape 2');
          break;
        case '3':
          alert('shape 3');
          break;
        case '4':
          alert('shape 4');
          break;
      }
    }
  });


  function drawSimonBoard() {
    let canvas = document.getElementById('simonCanvas');
    let board = canvas.getContext('2d');

    let circleX = canvas.width/2;
    let circleY = canvas.height/2;
    let circleRadius = 325;
    let startAngle = 0;
    let endAngle = 2*Math.PI;

    //Draws game board
    board.beginPath();
    //board.arc(350,350,325,0,2*Math.PI);
  //  board.arc(circleX, circleY, circleRadius, startAngle, endAngle);
    board.stroke();

    //draw vertical line
  /*  board.beginPath();
    board.moveTo(350, 25);
    board.lineTo(350, 675);
    board.stroke();

    //draw horizontal line
    board.beginPath();
    board.moveTo(25,350);
    board.lineTo(675, 350);
    board.stroke();*/

    //{'id': 1, 'color': ["rgba(250, 5, 5, 0.5)", "#ff0000"], 'start': [355,25],
    //'lines': [355, 345, 675, 345], 'arc': [355, 345, 320, ((Math.PI/180) * 270), ((Math.PI/180) *360)]};

    //draw panel 1 slice
    board.beginPath();
    //board.lineWidth = "2";

    board.moveTo(355, 25);
    board.lineTo(355, 345);
    board.lineTo(675, 345);
    //board.moveTo(675, 345);
    //board.lineTo(355, 345);
    let panelOneStart = (Math.PI/180) * 270;
    let panelOneEnd = (Math.PI/180) *360;
    board.arc(355, 345, 320, panelOneStart, panelOneEnd);
    //board.closePath();
    board.lineWidth = "2"
    board.strokeStyle = "black";
    board.fillStyle = "rgba(250, 5, 5, 0.5)";
    //board.fillStyle= '#ff0000';
    board.fill();
    //board.stroke();

    //{'id': 2, 'color': ["#4d44a9", "#0024ff"], 'start': [355,675],
    //'lines': [355, 355, 675, 355], 'arc': [355, 355, 320, ((Math.PI/180) * 360), ((Math.PI/180) *90)]};

    //draw panel 2 slice
    board.beginPath();
    board.moveTo(355, 675);
    board.moveTo(355, 355);
    board.lineTo(675, 355);


    let panelTwoStart = (Math.PI/180) * 360;
    let panelTwoEnd = (Math.PI/180) * 90;
    board.lineTo(355, 355);
    board.arc(355, 355, 320, panelTwoStart, panelTwoEnd);
    board.closePath();
    board.lineWidth = "2"
    board.strokeStyle = "black";
    board.fillStyle = "#4d44a9";
    //board.fillStyle = '#0024ff'
    board.fill();
    //board.stroke();

    //{'id': 3, 'color': ["#3b8a3b", "#00ff00"], 'start': [345,675],
    //'lines': [345, 355, 25, 355], 'arc': [345, 355, 320, ((Math.PI/180) * 90), ((Math.PI/180) *180)]};

    //draw panel 3 slice
    board.beginPath();
    //board.lineWidth = "2";

    board.moveTo(345,675);
    board.lineTo(345, 355);
    board.lineTo(25, 355);
    //board.moveTo(25, 355);
    //board.lineTo(345, 355);
    let panelThreeStart = (Math.PI/180) * 90;
    let panelThreeEnd = (Math.PI/180) *180;
    board.arc(345, 355, 320, panelThreeStart, panelThreeEnd);
    board.closePath();
    board.fillStyle = "#3b8a3b";
    //board.fillStyle = '#00ff00';
    board.fill();

    //{'id': 4, 'color': ["rgba(255, 255, 0, 0.5)", "#ffff00"], 'start': [345,25],
    //'lines': [345, 345, 25, 345], 'arc': [345, 345, 320, ((Math.PI/180) * 180), ((Math.PI/180) *270)]};

    //draw panel 4 slice
    board.beginPath();
  //  board.lineWidth = "2";

    board.moveTo(345, 25);
    board.lineTo(345, 345);
    board.lineTo(25, 345);

    let panelFourStart = (Math.PI/180) * 180;
    let panelFourEnd = (Math.PI/180) * 270;
    board.arc(345, 345, 320, panelFourStart, panelFourEnd);
    board.closePath();
    board.lineWidth = "2";
    board.strokeStyle = 'black';
    board.fillStyle = 'rgba(255, 255, 0, 0.5)';
    //board.fillStyle = "#ffff00";
    board.fill();
    //board.stroke();
  }



});
