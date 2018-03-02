$(document).ready(function() {

  //Object provides modal with options for not closing when clicked and showing
  //when initialized.
  let modalOption = {
    'backdrop' : 'static',
    'show' : true
  }
  //Calls modal when page loads
  $('#gameIntro').modal(modalOption);

  //-------------------------------------------------------------------------
  //Closure contains variables used to hold player/AI mark choices, gameboard
  //DOM ID's and position values, player toggle switch and winning combination.
  //-------------------------------------------------------------------------
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

  //-----------------------------------------------------------------------
  //Event listener attached to modal buttons for choice of either X or O marks.
  //When pressed sets human player to X or O, and computer player to choice that
  //human player didn't pick.
  //------------------------------------------------------------------------
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

  //----------------------------------------------------------------------
  //Event listener attached to reset game element, if clicked resets the game
  //board, player one/two wins and player/computer choices. Then brings up intro
  //modal.
  //-------------------------------------------------------------------
  $('#resetGame').on('click', function() {
    boardSettings.setPlayerChoice('');
    boardSettings.setComputerChoice('');
    $('#playerOneWins').text(0);
    $('#playerTwoWins').text(0);
    resetGameBoard();
    $('#gameIntro').modal(modalOption);
  }).css('cursor', 'pointer');

  //-----------------------------------------------------------------------
  //Event listener attached to each board space on the game board through a CSS
  //class. When element clicked on by human player, marks it with players choice
  //checks for win/tie and then allows computer to make move, and then checks for
  //win/tie.
  //---------------------------------------------------------------------
  $('.board-space').on('click', function() {
    let markedSpace = $(this).attr('id');
    let mark = '';

    mark = boardSettings.getPlayerChoice();

    let playerTemp = markBoard(markedSpace, mark);
    boardSettings.setPlayer(playerTemp);

    let testForWin = checkForWin(mark);

    //If no tie/win, computers turn is iniatied or else mark win for player or tie.
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

  //-----------------------------------------------------------------------
  //Marks humnan player move if space is empty, or else returns back to function
  //that made the call if space is not empty.
  //-------------------------------------------------------------------
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

  //-------------------------------------------------------------------
  //Function makes computer players mark by randomingly picking an empty slot
  //on game board.
  //-------------------------------------------------------------------
  function computerMarkRandom() {
    let compChoice = Math.floor(Math.random() * 9);
    let tempBoardID = boardSettings.getBoardID();

    let idSpot = boardSettings.getIDValue(compChoice);

    let $chosenSpace = $('#' + idSpot);
    let spaceValue = $chosenSpace.text().replace(/\s/g, "");
    let compMark = boardSettings.getComputerChoice();

    //If space is empty make mark or else call computerMarkRandom function until
    //empty slot is chosen.
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

  //------------------------------------------------------------------------
  //Based on how many empty spaces on board, computer makes move either by miniMax
  //algorithm or by calling computerMarkRandom function to make a random move.
  //-------------------------------------------------------------------------
  function computerMarkBoard() {

    let tempBoardID = boardSettings.getBoardID();
    let computerTurnBoard = boardSettings.getBoard();
    let emptyIndex = emptySpaces(computerTurnBoard);
    let compMark = boardSettings.getComputerChoice();

    //If empty spaces less than or equal to 7 use miniMax algorithm.
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

  //--------------------------------------------------------------------------
  //Function uses minimax algorithm for the computer player to make a move by scoring
  //in depth the moves/outcomes of the human player and itself.
  //--------------------------------------------------------------------------------
  function miniMax(player) {
    let board = boardSettings.getBoard();
    let availableSpaces = emptySpaces(board);
    let score = checkForWin(board);
    let compPlayer = boardSettings.getComputerChoice();
    let huPlayer = boardSettings.getPlayerChoice();

    //Score possible outcomes of moves by comp/human player
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
    //Increment over all available spaces making moves for hu/comp player
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

      //Push index/points of each move to an array.
      movesArray.push(move);
    }

    //Find best move for comp/human players when it's there turn.
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

    //Return best index/points pair to calling function.
    return movesArray[bestMove];
  }

  //--------------------------------------------------------------------
  //Function highlights either player one/two based on who's turn it is
  //-------------------------------------------------------------------
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

  //------------------------------------------------------------------------
  //Function checks to see if comp or human player has won by checking for
  //possible horizontal, vertical and diagonal winning combinations, or for a
  //tied game
  //-------------------------------------------------------------------------
  function checkForWin(mark) {

    let tempNewBoard = boardSettings.getBoard();
    let computerChoice = boardSettings.getComputerChoice();
    let humanChoice = boardSettings.getPlayerChoice();
    //Check for row win
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

    //No one wins and board not full
    return 0;
  }

  //---------------------------------------
  //Checks and returns empty spaces.
  //---------------------------------------
  function emptySpaces(tempBoard) {
    return tempBoard.filter(function(spaces) {
      return spaces != "O" && spaces != 'X';
    });
  }

  //-------------------------------------------------------------------------
  //Marks winning combination on board for either computer or human player.
  //------------------------------------------------------------------------
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

  //-------------------------------------------------------------------------
  //Function increases score for either player one or two based on parameter result
  //value, or console.logs tied game, then makes a delay call to resetGameBoard
  //function.
  //------------------------------------------------------------------------
  function endGame(result) {
    let $playerOneWins = $('#playerOneWins');
    let $playerTwoWins = $('#playerTwoWins');
    let tempValue = 0;

    if(result == -1) {
      tempValue = $playerOneWins.text().replace(/\s/g, "");
      $playerOneWins.text(parseInt(tempValue) + 1);
      console.log('You Win!');
      setTimeout(resetGameBoard, 2000);
    }
    else if(result == 1) {
      tempValue = $playerTwoWins.text().replace(/\s/g,"");
      $playerTwoWins.text(parseInt(tempValue) + 1);
      console.log('AI wins!');
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

  //-------------------------------------------------------------------------------
  //Function reset's game board to blank, clears board array, and winning combination
  //array too. Makes call to computerMarkBoard if it's computers turn after board resets
  //---------------------------------------------------------------------------------
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
