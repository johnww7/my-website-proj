$(document).ready(function() {

  let modalOption = {
    'backdrop' : 'static',
    'show' : true
  }
  $('#gameIntro').modal(modalOption);

  let playerChoice = '';
  let computerChoice = '';
  let originalBoard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
  let boardID = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  let newBoard = [];
  let realPlayer = true;
  let playerNum = 0;

  //Cached DOM
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
    console.log('player: ' + playerChoice + ' computer: ' + computerChoice);
    console.log(newBoard);
    playerNum = Math.floor(Math.random() * 2);
    $('#gameIntro').modal('hide');
  });

  $('#resetGame').on('click', function() {
    playerChoice = '';
    computerChoice = '';
    $('#playerOneWins').text(0);
    $('#playerTwoWins').text(0);
    resetGameBoard();
    $('#gameIntro').modal(modalOption);
  }).css('cursor', 'pointer');

  $('.board-space').on('click', function() {
    let markedSpace = $(this).attr('id');
    let mark = '';

    /*if(realPlayer) {
    //  realPlayer = false;
        mark = playerChoice;
    }
    else {
    //  realPlayer = true;
        mark = computerChoice;

    }*/
    mark = playerChoice;

    realPlayer = markBoard(markedSpace, mark);

    console.log(realPlayer);

    let testForWin = checkForWin();
    if(testForWin == 0) {
      setTimeout(computerMarkBoard, 1000);
      let testCompWin = checkForWin();
      endGame(testCompWin);
    }
    else {
      endGame(testForWin);
    }


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
      whosTurn();
      return !realPlayer;
    }
    /*else if(spaceValue == 'X' || spaceValue == 'O') {
      return;
    }*/
    else {
      $('#' + space).text(spaceValue);
      return realPlayer;
    }

  }

  function computerMarkBoard() {
    let compChoice = Math.floor(Math.random() * 9);
    let idSpot = boardID[compChoice];
    let $chosenSpace = $('#' + idSpot);
    let spaceValue = $chosenSpace.text().replace(/\s/g, "");

    if(spaceValue == '' || spaceValue == ' ') {
      $chosenSpace.text(computerChoice);
      let position = boardID.indexOf(idSpot);
      console.log('computer pick: ' + position);
      newBoard[position] = computerChoice;
      whosTurn();
      realPlayer = !realPlayer;
      return;
    }
    else {
      $chosenSpace.text(spaceValue);
      computerMarkBoard();
    }

  }

  function whosTurn() {
    let $playerOne = $('#playerOne');
    let $playerTwo = $('#playerTwo');
    if(realPlayer) {
      $playerOne.removeClass('highlight-turn');
      $playerTwo.removeClass('no-turn');
      $playerTwo.addClass('highlight-turn');
      $playerOne.addClass('no-turn');
    }
    else {
      $playerTwo.removeClass('highlight-turn');
      $playerOne.removeClass('no-turn');
      $playerOne.addClass('highlight-turn');
      $playerTwo.addClass('no-turn');
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

    //Check for board full
    let fullBoard = newBoard.filter(function(space) {
      return space == 'X' || space == 'O';
    });
    if(fullBoard.length == newBoard.length) {
      return 2;
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
    let $playerOneWins = $('#playerOneWins');
    let $playerTwoWins = $('#playerTwoWins');
    let tempValue = 0;

    if(playerChoice == 'X' && result == 1) {
      tempValue = $playerOneWins.text().replace(/\s/g, "");
      $playerOneWins.text(parseInt(tempValue) + 1);
    }
    else if(playerChoice == 'O' && result == -1) {
      tempValue = $playerOneWins.text().replace(/\s/g, "");
      $playerOneWins.text(parseInt(tempValue) + 1);
    }
    else if(computerChoice == 'X' && result == 1) {
      tempValue = $playerTwoWins.text().replace(/\s/g,"");
      $playerTwoWins.text(parseInt(tempValue) + 1);
    }
    else if(computerChoice == 'O' && result == -1) {
      tempValue = $playerTwoWins.text().replace(/\s/g,"");
      $playerTwoWins.text(parseInt(tempValue) + 1);
    }
    else if(result == 2) {
      console.log('Tied Game');
    }
    else {
      return;
    }
    setTimeout(resetGameBoard, 5000);

  }

  function resetGameBoard() {
      newBoard.length = 0;
      newBoard = [...originalBoard];

      boardID.forEach(function(mark) {
        $('#' + mark).css('color', '');
        $('#' + mark).css('color', 'black');
      });
      $('.board-space').empty();

      if(!realPlayer) {
        computerMarkBoard();
      }
      //$('.board-space').css('color', 'black');
  }

  function playerTurn() {
    //let pick = Math.floor(Math.random() * 2);
    let markPick = '';

    if(realPlayer == true && playerNum == 0) {
      markPick = playerChoice;
    }
    else if(realPlayer == true && playerNum ==1) {
      markPick = computerChoice;
    }
    else if(realPlayer == false && playerNum == 0) {
      markPick = playerChoice;
    }
    else if (realPlayer == false && playerNum == 1){
      markPick = computerChoice;
    }
    return markPick;
  }

});
