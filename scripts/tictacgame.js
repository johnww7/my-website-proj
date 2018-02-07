$(document).ready(function() {
  $('#gameIntro').modal('show');

  let playerChoice = '';
  let computerChoice = '';
  let originalBoard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

  $('#chooseX, #chooseY').on('click', function() {
    let choice = $(this).attr('id');

    if(choice == 'chooseX') {
      playerChoice = 'X';
      computerChoice ='O';
    }
    else {
      playerChoice = 'O';
      computerChoice = 'X';

    }

    $('#gameIntro').modal('hide');
  });

  $('.boardSpace').on('click', function() {
    let markedSpace = $(this).attr('id');

    

  });





});
