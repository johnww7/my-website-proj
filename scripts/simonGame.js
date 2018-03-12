$(document).ready(function() {
  drawSimonBoard();

  function drawSimonBoard() {
    let board = document.getElementById('simonCanvas').getContext('2d');

    //Draws game board
    board.beginPath();
    board.arc(350,350,325,0,2*Math.PI)
    board.stroke();

    //draw vertical line
    board.beginPath();
    board.moveTo(350, 25);
    board.lineTo(350, 675);
    board.stroke();

    //draw horizontal lineTo
    board.beginPath();
    board.moveTo(25,350);
    board.lineTo(675, 350);
    board.stroke();
  }

});
