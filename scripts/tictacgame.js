$(document).ready(function() {

  let modalOption = {
    'backdrop' : 'static',
    'show' : true
  }
  $('#gameIntro').modal(modalOption);

  let boardSettings = (function() {
    let playerChoice = '';
    let computerChoice = '';
    let originalBoard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    let boardID = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
    let newBoard = [];
    let realPlayer = true;

    return {
      setPlayerChoice: function(pChoice) {
        playerChoice = pChoice;
      },
      getPlayerChoice: function() {
        return playerChoice;
      },
      setComputerChoice: function(cChoice) {
        computerChoice = cChoice;
      },
      getComputerChoice: function() {
        return computerChoice;
      },
      getOrigBoard: function() {
        return originalBoard;
      },
      getBoardID: function() {
        return boardID;
      },
      getIDValue: function(num) {
        return boardID[num];
      },
      getIDIndex: function(index) {
        return boardID.indexOf(index);
      },
      setBoard: function(nBoard) {
        newBoard = nBoard;
      },
      setBoardPos: function(pos, val) {
        newBoard[pos] = val;
      },
      getBoard: function() {
        return newBoard;
      },
      resetBoard: function() {
        newBoard.length = 0;
        newBoard = [...originalBoard];
      },
      setPlayer: function(real) {
        realPlayer = real;
      },
      getPlayer: function() {
        return realPlayer;
      }
    }

  })()


  let playerNum = 0;

  //Cached DOM
  let $board = $('#board');

  $('#chooseX, #chooseY').on('click', function() {
    let choice = $(this).attr('id');

    if(choice == 'chooseX') {
      boardSettings.setPlayerChoice('X');
      boardSettings.setComputerChoice('O');
    }
    else {
      boardSettings.setPlayerChoice('O');
      boardSettings.setComputerChoice('X');

    }
    boardSettings.setBoard([...boardSettings.getOrigBoard()]);
    console.log('player: ' + boardSettings.getPlayerChoice() + ' computer: ' + boardSettings.getComputerChoice());
    console.log(boardSettings.getBoard());
    playerNum = Math.floor(Math.random() * 2);
    $('#gameIntro').modal('hide');
  });

  $('#resetGame').on('click', function() {
    boardSettings.setPlayerChoice('');
    boardSettings.setComputerChoice('');
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
    mark = boardSettings.getPlayerChoice();

    let playerTemp = markBoard(markedSpace, mark);
    boardSettings.setPlayer(playerTemp);

    console.log(boardSettings.getPlayer());
    let tempPlayerBoard = boardSettings.getBoard();
    let testForWin = checkForWin(tempPlayerBoard);
    if(testForWin == 0) {
    //  setTimeout(computerMarkBoard, 1000);
      computerMarkBoard();
      let tempCompBoard = boardSettings.getBoard();
      console.log('comp board: ' + tempCompBoard);
      let testCompWin = checkForWin(tempCompBoard);
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

      let position = boardSettings.getBoardID().indexOf(space);
      console.log(position);
      boardSettings.setBoardPos(position, playerMark);
      console.log(boardSettings.getBoard());
      whosTurn();
      return !boardSettings.getPlayer();
    }
    /*else if(spaceValue == 'X' || spaceValue == 'O') {
      return;
    }*/
    else {
      $('#' + space).text(spaceValue);
      return boardSettings.getPlayer();
    }

  }


  function computerMarkBoard() {
    let compChoice = Math.floor(Math.random() * 9);
    let tempBoardID = boardSettings.getBoardID();
    //console.log('board id: ' + tempBoardID);
    let idSpot = boardSettings.getIDValue(compChoice);
    console.log('id: ' + idSpot);
    let $chosenSpace = $('#' + idSpot);
    let spaceValue = $chosenSpace.text().replace(/\s/g, "");
    let compMark = boardSettings.getComputerChoice();

    if(spaceValue == '' || spaceValue == ' ') {
      $chosenSpace.text(compMark);
      let position = boardSettings.getIDIndex(idSpot);
      console.log('computer pick: ' + position);
      boardSettings.setBoardPos(position, compMark);
      whosTurn();
      let tempPlayer = boardSettings.getPlayer();
      boardSettings.setPlayer(!tempPlayer);
      return;
    }
    else {
      $chosenSpace.text(spaceValue);
      computerMarkBoard();
    }

  }

  function negaMax(board, turnColor) {
    let availableSpaces = emptySpaces(board);

    if(checkForWin(board) === 1) {
      return 10 * turnColor;
    }

    if(checkForWin(board) === -1) {
      return -10 * turnColor;
    }

    if(availableSpaces.length === 0) {
      return 0;
    }

    let best = -1000;
    for(let i = 0; i < availableSpaces.length; i++) {
      let mark = ''
      if(turnColor === -1) {
        mark = boardSettings.getComputerChoice();
      }
      else {
        mark = boardSettings.getPlayerChoice();
      }
      let tempMove = board[availableSpaces[i]];
      board[availableSpaces[i]] = mark;

      best = Math.max(best, -negaMax(board, -turnColor));

      board[availableSpaces[i]] = tempMove;
    }
    return best; 
  }

  function whosTurn() {
    let $playerOne = $('#playerOne');
    let $playerTwo = $('#playerTwo');
    if(boardSettings.getPlayer()) {
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

  function checkForWin(tempNewBoard) {
    //let tempNewBoard = boardSettings.getBoard();
    console.log('Check for win: ' + tempNewBoard);
    //Check for row win
    for(let rowIndex = 0; rowIndex < tempNewBoard.length; rowIndex++) {
      if(rowIndex == 0 || rowIndex == 3 || rowIndex == 6) {
        if(tempNewBoard[rowIndex] == tempNewBoard[rowIndex+1] && tempNewBoard[rowIndex+1] ==tempNewBoard[rowIndex+2]){
            markWin(rowIndex, rowIndex+1, rowIndex+2);
            if(tempNewBoard[rowIndex] == 'X')
              return 1;
            else
              return -1;
        }
      }
    }

    //Check for colum win
    for(let colIndex = 0; colIndex < tempNewBoard.length; colIndex++) {
      if(colIndex == 0 || colIndex == 1 || colIndex == 2) {
        if(tempNewBoard[colIndex] == tempNewBoard[colIndex+3] && tempNewBoard[colIndex+3] == tempNewBoard[colIndex+6]){
          markWin(colIndex, colIndex+3, colIndex+6);
          if(tempNewBoard[colIndex] == 'X')
            return 1;
          else
            return -1;
        }
      }
    }

    //Check for diagonal win
    if(tempNewBoard[0] == tempNewBoard[4] && tempNewBoard[4] == tempNewBoard[8]){
      markWin(0, 4, 8);
      if(tempNewBoard[0] == 'X')
        return 1;
      else
        return -1;
    }

    if(tempNewBoard[2] == tempNewBoard[4] && tempNewBoard[4] == tempNewBoard[6]){
      markWin(2, 4, 6);
      if(tempNewBoard[0] == 'X')
        return 1;
      else
        return -1;
    }

    let fullBoard = tempNewBoard.filter(function(ele) {
      return ele == 'O' || ele == 'X';
    });
    //Check for board full
    //let fullBoard = emptySpaces(tempNewBoard);
    if(fullBoard.length === tempNewBoard.length) {
      return 2;
    }

    //No one wins
    return 0;
  }

  function emptySpaces(tempBoard) {
    return tempBoard.filter(function(spaces) {
      return spaces != "O" || spaces != 'X';
    });
  }

  function markWin(pos1, pos2, pos3) {
    let winningSpace = [pos1, pos2, pos3];
    let tempBoardID = boardSettings.getBoardID();
    console.log(winningSpace);

    winningSpace.forEach(function(elem) {
      let id = tempBoardID[elem];
      $('#' + id).css('color', 'red');
    });
    return;
  }

  function endGame(result) {
    let $playerOneWins = $('#playerOneWins');
    let $playerTwoWins = $('#playerTwoWins');
    let tempValue = 0;

    if(boardSettings.getPlayerChoice() == 'X' && result == 1) {
      tempValue = $playerOneWins.text().replace(/\s/g, "");
      $playerOneWins.text(parseInt(tempValue) + 1);
    }
    else if(boardSettings.getPlayerChoice() == 'O' && result == -1) {
      tempValue = $playerOneWins.text().replace(/\s/g, "");
      $playerOneWins.text(parseInt(tempValue) + 1);
    }
    else if(boardSettings.getComputerChoice() == 'X' && result == 1) {
      tempValue = $playerTwoWins.text().replace(/\s/g,"");
      $playerTwoWins.text(parseInt(tempValue) + 1);
    }
    else if(boardSettings.getComputerChoice() == 'O' && result == -1) {
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
      boardSettings.resetBoard();
      let tempBoardID = boardSettings.getBoardID();

      tempBoardID.forEach(function(mark) {
        $('#' + mark).css('color', '');
        $('#' + mark).css('color', 'black');
      });
      $('.board-space').empty();

      if(!boardSettings.getPlayer()) {
        computerMarkBoard();
      }
      //$('.board-space').css('color', 'black');
  }

  function playerTurn() {
    //let pick = Math.floor(Math.random() * 2);
    let markPick = '';

    if(boardSettings.getPlayer() == true && playerNum == 0) {
      markPick = boardSettings.getPlayerChoice();
    }
    else if(boardSettings.getPlayer() == true && playerNum ==1) {
      markPick = boardSettings.getComputerChoice();
    }
    else if(boardSettings.getPlayer() == false && playerNum == 0) {
      markPick = boardSettings.getPlayerChoice();
    }
    else if (boardSettings.getPlayer() == false && playerNum == 1){
      markPick = boardSettings.getComputerChoice();
    }
    return markPick;
  }

});
