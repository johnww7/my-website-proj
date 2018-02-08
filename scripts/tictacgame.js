$(document).ready(function() {
  $('#gameIntro').modal('show');

  let playerChoice = '';
  let computerChoice = '';
  let originalBoard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
  let boardID = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  let newBoard = [];
  let maxPlayer = true;

  let $board = $('#board');

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
    newBoard = [...originalBoard];
    console.log(newBoard);

    $('#gameIntro').modal('hide');
  });

  $('.boardSpace').on('click', function() {
    let markedSpace = $(this).attr('id');
    let mark = '';

    if(maxPlayer) {
    //  maxPlayer = false;
      mark = 'X';
    }
    else {
    //  maxPlayer = true;
      mark = 'O';
    }

    maxPlayer = markBoard(markedSpace, mark);

    console.log(maxPlayer);

    let testForWin = checkForWin();
    //endGame(testForWin);
  });

  function markBoard(space, playerMark) {
    let spaceValue = $('#' + space).text().replace(/\s/g, "");
    console.log(spaceValue);

    if(spaceValue == '' || spaceValue == ' ') {
      $('#' + space).text(playerMark);

      let position = boardID.indexOf(space);
      console.log(position);
      newBoard[position] = playerMark;
      console.log(newBoard);
      return !maxPlayer;
    }
    /*else if(spaceValue == 'X' || spaceValue == 'O') {
      return;
    }*/
    else {
      $('#' + space).text(spaceValue);
      return maxPlayer;
    }

  }

  function checkForWin() {
    //Check for row win
    for(let rowIndex = 0; rowIndex < newBoard.length; rowIndex++) {
      if(rowIndex == 0 || rowIndex == 3 || rowIndex == 6) {
        if(newBoard[rowIndex] == newBoard[rowIndex+1] && newBoard[rowIndex+1] ==newBoard[rowIndex+2]){
            markWin(rowIndex, rowIndex+1, rowIndex+2);
            if(newBoard[rowIndex] == 'X')
              return 1;
            else
              return -1;
        }
      }
    }

    //Check for colum win
    for(let colIndex = 0; colIndex < newBoard.length; colIndex++) {
      if(colIndex == 0 || colIndex == 1 || colIndex == 2) {
        if(newBoard[colIndex] == newBoard[colIndex+3] && newBoard[colIndex+3] == newBoard[colIndex+6]){
          markWin(colIndex, colIndex+3, colIndex+6);
          if(newBoard[colIndex] == 'X')
            return 1;
          else
            return -1;
        }
      }
    }

    //Check for diagonal win
    if(newBoard[0] == newBoard[4] && newBoard[4] == newBoard[8]){
      markWin(0, 4, 8);
      if(newBoard[0] == 'X')
        return 1;
      else
        return -1;
    }

    if(newBoard[2] == newBoard[4] && newBoard[4] == newBoard[8]){
      markWin(2, 4, 8);
      if(newBoard[0] == 'X')
        return 1;
      else
        return -1;
    }

    //No one wins
    return 0;
  }

  function markWin(pos1, pos2, pos3) {
    let winningSpace = [pos1, pos2, pos3];
    console.log(winningSpace);

    winningSpace.forEach(function(elem) {
      let id = boardID[elem];
      $('#' + id).css('color', 'red');
    });
    return;
  }

  function endGame(result) {
    if(playerChoice == 'X' && result == 1) {

    }
  }

});
