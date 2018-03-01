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
    let winningArray = [];

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
      },
      setMarkWin: function(pos1, pos2, pos3) {
        winningArray[0] = pos1;
        winningArray[1] = pos2;
        winningArray[2] = pos3;
      },
      getMarkWin: function() {
        return winningArray;
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

    mark = boardSettings.getPlayerChoice();

    let playerTemp = markBoard(markedSpace, mark);
    boardSettings.setPlayer(playerTemp);

    let testForWin = checkForWin(mark);

    if(testForWin == 0) {
      computerMarkBoard();

      mark = boardSettings.getComputerChoice();
      let testCompWin = checkForWin(mark);
      markWin(testCompWin);
      endGame(testCompWin);
    }
    else {
      markWin(testForWin);
      endGame(testForWin);
    }


  });


  function markBoard(space, playerMark) {
    let spaceValue = $('#' + space).text().replace(/\s/g, "");

    if(spaceValue == '' || spaceValue == ' ') {
      $('#' + space).text(playerMark);

      let position = boardSettings.getBoardID().indexOf(space);
      boardSettings.setBoardPos(position, playerMark);
      whosTurn();
      return !boardSettings.getPlayer();
    }
    else {
      $('#' + space).text(spaceValue);
      return boardSettings.getPlayer();
    }

  }


  function computerMarkRandom() {
    let compChoice = Math.floor(Math.random() * 9);
    let tempBoardID = boardSettings.getBoardID();

    let idSpot = boardSettings.getIDValue(compChoice);

    let $chosenSpace = $('#' + idSpot);
    let spaceValue = $chosenSpace.text().replace(/\s/g, "");
    let compMark = boardSettings.getComputerChoice();

    if(spaceValue == '' || spaceValue == ' ') {
      $chosenSpace.text(compMark);
      let position = boardSettings.getIDIndex(idSpot);

      boardSettings.setBoardPos(position, compMark);
      whosTurn();
      let tempPlayer = boardSettings.getPlayer();
      boardSettings.setPlayer(!tempPlayer);
      return;
    }
    else {
      $chosenSpace.text(spaceValue);
      computerMarkRandom();
    }

  }

  function computerMarkBoard() {

    let tempBoardID = boardSettings.getBoardID();
    let computerTurnBoard = boardSettings.getBoard();
    let emptyIndex = emptySpaces(computerTurnBoard);
    let compMark = boardSettings.getComputerChoice();

    if(emptyIndex.length <= 7) {

      let computerMove = miniMax(boardSettings.getComputerChoice());
      let idSpot = boardSettings.getIDValue(computerMove.index);
      let $chosenSpace = $('#' + idSpot);

      $chosenSpace.text(compMark);
      let position = boardSettings.getIDIndex(idSpot);

      boardSettings.setBoardPos(position, compMark);
      whosTurn();
      let tempPlayer = boardSettings.getPlayer();
      boardSettings.setPlayer(!tempPlayer);
      return;
    }
    else {
      computerMarkRandom();
      return;
    }
  }


  function miniMax(player) {
    let board = boardSettings.getBoard();
    let availableSpaces = emptySpaces(board);
    let score = checkForWin(board);
    let compPlayer = boardSettings.getComputerChoice();
    let huPlayer = boardSettings.getPlayerChoice();

    if(checkForWin(compPlayer) === 1) {
      return {point: 10};
    }
    else if(checkForWin(huPlayer) === -1) {
      return {point: -10};
    }
    else if(availableSpaces.length === 0) {
      return {point: 0};
    }

    let movesArray = [];
    for(let i=0; i < availableSpaces.length; i++) {
      let move ={};
      let tempIndex = parseInt(availableSpaces[i]);
      move.index = board[tempIndex];
      board[tempIndex] = player;

      if(player === compPlayer) {

        let resultA = miniMax(huPlayer);
        move.point = resultA.point;
      }
      else {
        let resultB = miniMax(compPlayer);
        move.point = resultB.point;
      }
      board[tempIndex] = move.index;

      movesArray.push(move);
    }

    var bestMove;
    if(player === compPlayer) {
      var best = -10000;
      for (let j = 0; j < movesArray.length; j++) {
        if(movesArray[j].point > best) {
          best = movesArray[j].point;
          bestMove = j;
        }
      }

    }
    else {
      var bestVal = 10000;
      for (let x = 0; x < movesArray.length; x++) {
        if(movesArray[x].point < bestVal) {

          bestVal = movesArray[x].point;
          bestMove = x;
        }

      }

    }

    return movesArray[bestMove];

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

  function checkForWin(mark) {

    //Check for row win
    let tempNewBoard = boardSettings.getBoard();
    let computerChoice = boardSettings.getComputerChoice();
    let humanChoice = boardSettings.getPlayerChoice();
    for(let rowIndex = 0; rowIndex < tempNewBoard.length; rowIndex+=3) {
      if(rowIndex == 0 || rowIndex == 3 || rowIndex == 6) {
        if(tempNewBoard[rowIndex] == tempNewBoard[rowIndex+1] && tempNewBoard[rowIndex+1] ==tempNewBoard[rowIndex+2]){
            boardSettings.setMarkWin(rowIndex, rowIndex+1, rowIndex+2);

            if(tempNewBoard[rowIndex] === mark && mark === humanChoice)
              return -1;
            else if(tempNewBoard[rowIndex] === mark && mark === computerChoice)
              return 1;
        }
      }
    }

    //Check for colum win
    for(let colIndex = 0; colIndex < 3; colIndex++) {
      if(colIndex == 0 || colIndex == 1 || colIndex == 2) {
        if(tempNewBoard[colIndex] == tempNewBoard[colIndex+3] && tempNewBoard[colIndex+3] == tempNewBoard[colIndex+6]){
          boardSettings.setMarkWin(colIndex, colIndex+3, colIndex+6);

          if(tempNewBoard[colIndex] === mark && mark === humanChoice)
            return -1;
          else if(tempNewBoard[colIndex] === mark && mark === computerChoice)
            return 1;
        }
      }
    }

    //Check for diagonal win
    if(tempNewBoard[0] == tempNewBoard[4] && tempNewBoard[4] == tempNewBoard[8]){
      boardSettings.setMarkWin(0, 4, 8);

      if(tempNewBoard[0] === mark && mark === humanChoice)
        return -1;
      else if(tempNewBoard[0] === mark && mark === computerChoice)
        return 1;
    }

    if(tempNewBoard[2] == tempNewBoard[4] && tempNewBoard[4] == tempNewBoard[6]){
      boardSettings.setMarkWin(2, 4, 6);
      //markWin(2, 4, 6);
      if(tempNewBoard[2] === mark && mark === humanChoice)
        return -1;
      else if(tempNewBoard[2] === mark && mark === computerChoice)
        return 1;
    }

    //Check for board full
    let fullBoard = tempNewBoard.filter(function(ele) {
      return ele == 'O' || ele == 'X';
    });
    if(fullBoard.length === tempNewBoard.length) {
      return 2;
    }

    //No one wins
    return 0;
  }

  function emptySpaces(tempBoard) {
    return tempBoard.filter(function(spaces) {
      return spaces != "O" && spaces != 'X';
    });
  }

  function markWin(winResult) {
    let winningSpace = boardSettings.getMarkWin();
    let tempBoardID = boardSettings.getBoardID();

    if(winResult == 1 || winResult == -1) {
      winningSpace.forEach(function(elem) {
        let id = tempBoardID[elem];
        $('#' + id).css('color', 'rgba(0, 255, 251, 0.9)');
      });
      return;
    }
    return;
  }

  function endGame(result) {
    let $playerOneWins = $('#playerOneWins');
    let $playerTwoWins = $('#playerTwoWins');
    let tempValue = 0;

    if(result == -1) {
      tempValue = $playerOneWins.text().replace(/\s/g, "");
      $playerOneWins.text(parseInt(tempValue) + 1);
      setTimeout(resetGameBoard, 2000);
    }
    else if(result == 1) {
      tempValue = $playerTwoWins.text().replace(/\s/g,"");
      $playerTwoWins.text(parseInt(tempValue) + 1);
      setTimeout(resetGameBoard, 2000);
    }
    else if(result == 2) {
      console.log('Tied Game');
      setTimeout(resetGameBoard, 2000);
    }
    else {
      return;
    }

  }

  function resetGameBoard() {
      boardSettings.resetBoard();
      let tempBoardID = boardSettings.getBoardID();

      tempBoardID.forEach(function(mark) {
        $('#' + mark).css('color', '');
        $('#' + mark).css('color', '#ffe500');
      });
      $('.board-space').empty();
      boardSettings.setMarkWin(0, 0 ,0);

      if(!boardSettings.getPlayer()) {
        computerMarkBoard();
      }

  }

});
