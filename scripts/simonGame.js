$(document).ready(function() {
  drawSimonBoard();

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

    //draw panel 1 slice
    board.beginPath();
    board.lineWidth = "2";
    board.strokeStyle = "red";
    board.moveTo(355, 25);
    board.lineTo(355, 345);
    board.moveTo(675, 345);
    board.lineTo(355, 345);
    let panelOneStart = (Math.PI/180) * 270;
    let panelOneEnd = (Math.PI/180) *360;
    board.arc(355, 345, 320, panelOneStart, panelOneEnd);
    board.stroke();

    //draw panel 2 slice
    board.beginPath();
    board.lineWidth = "2"
    board.strokeStyle = "red";
    board.moveTo(355, 355);
    board.lineTo(355, 675);
    board.moveTo(675, 355);
    board.lineTo(355, 355);
    let panelTwoStart = (Math.PI/180) * 0;
    let panelTwoEnd = (Math.PI/180) * 90;
    board.arc(355, 355, 320, panelTwoStart, panelTwoEnd);
    board.stroke();

    //draw panel 3 slice
    board.beginPath();
    board.lineWidth = "2";
    board.strokeStyle = "red";
    board.moveTo(345,675);
    board.lineTo(345, 355);
    board.moveTo(25, 355);
    board.lineTo(345, 355);
    let panelThreeStart = (Math.PI/180) * 90;
    let panelThreeEnd = (Math.PI/180) *180;
    board.arc(345, 355, 320, panelThreeStart, panelThreeEnd);
    board.stroke();

    //draw panel 4 slice
    board.beginPath();
    board.lineWidth = "2";
    board.strokeStyle = "red";
    board.moveTo(345, 25);
    board.lineTo(345, 345);
    board.moveTo(25, 345);
    board.lineTo(345,345);
    let panelFourStart = (Math.PI/180) * 180;
    let panelFourEnd = (Math.PI/180) * 270;
    board.arc(345, 345, 320, panelFourStart, panelFourEnd);
    board.stroke();
  }

});
