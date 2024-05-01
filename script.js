// Generates board, places piece, and prints board
function GameBoard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const checkWin = (player) => {
    // Horizontal
    for (let i = 0; i < rows; i++) {
      let piecesInRow = 0;
      for (let j = 0; j < cols; j++) {
        const piece = board[i][j];
        if (piece.getValue() === player) {
          piecesInRow += 1;
        }
      }
      if (piecesInRow === 3) {
        console.log(`Player ${player} placed three in a row!`);
        return true;
      }
    }

    // Vertical
    for (let j = 0; j < rows; j++) {
      let piecesInCol = 0;
      for (let i = 0; i < cols; i++) {
        const piece = board[i][j];
        if (piece.getValue() === player) {
          piecesInCol += 1;
        }
      }
      if (piecesInCol === 3) {
        console.log(`Player ${player} placed three in a column!`);
        return true;
      }
    }

    // Main Diagonal \
    let piecesInMainDiag = 0;
    for (let i = 0; i < rows; i++) {
      const piece = board[i][i];
      if (piece.getValue() === player) {
        piecesInMainDiag += 1;
      }
    }
    if (piecesInMainDiag === 3) {
      console.log(`Player ${player} placed three in a main diagonal!`);
      return true;
    }

    // Leading Diagonal /
    let piecesInLeadDiag = 0;
    for (let i = 0; i < rows; i++) {
      const j = cols - 1 - i;
      const piece = board[i][j];
      if (piece.getValue() === player) {
        piecesInLeadDiag += 1;
      }
    }
    if (piecesInLeadDiag === 3) {
      console.log(`Player ${player} placed three in a leading diagonal!`);
      return true;
    }

    return false;
  };

  const placePiece = (row, col, player) => {
    if (
      row >= 0 &&
      row < board.length &&
      col >= 0 &&
      col < board[0].length &&
      board[row][col].isEmpty()
    ) {
      board[row][col].addPiece(player);
      return true;
    } else {
      return false;
    }
  };

  const restartGame = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        board[i][j].clearCell();
      }
    }
  };

  return { getBoard, placePiece, restartGame, checkWin };
}

function Cell() {
  let value = "-";

  const addPiece = (player) => {
    value = player;
  };

  const isEmpty = () => {
    return value == "-";
  };

  const getValue = () => value;

  const clearCell = () => {
    value = "-";
  };

  return { addPiece, getValue, isEmpty, clearCell };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = GameBoard();

  const players = [
    {
      name: playerOneName,
      piece: "X",
    },
    {
      name: playerTwoName,
      piece: "O",
    },
  ];

  let activePlayer = players[0];
  let winningPlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const getWinningPlayer = () => winningPlayer;

  const playRound = (row, column) => {
    if (!winningPlayer) {
      piecePlaced = board.placePiece(row, column, activePlayer.piece);
      if (!piecePlaced) {
        console.log("Unable to place!");
        return false;
      }

      if (board.checkWin(activePlayer.piece)) {
        winningPlayer = activePlayer;
      }

      switchPlayerTurn();
    } else {
      console.log(`Sorry, ${activePlayer.name} already won the game.`);
      return false;
    }
    return true;
  };

  const restartGame = () => {
    activePlayer = players[0];
    board.restartGame();
    winningPlayer = "";
  };

  return { playRound, getActivePlayer, getWinningPlayer, restartGame };
}

function ScreenController() {
  let game;
  const turnH1 = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const playerOne = document.getElementById("player-one");
  const playerTwo = document.getElementById("player-two");
  const submitBtn = document.getElementById("submit-btn");

  const container = document.querySelector(".container");
  const playerForm = document.querySelector(".player-form");

  function onSubmit(event) {
    event.preventDefault();

    if (playerOne.value !== "" && playerTwo.value !== "") {
      game = GameController(playerOne.value, playerTwo.value);
      container.removeChild(playerForm);
      startNewGame();
    }
  }

  submitBtn.addEventListener("click", onSubmit);

  function gameComplete() {
    const winningPlayer = game.getWinningPlayer();
    if (winningPlayer) {
      turnH1.textContent = `${winningPlayer.name} won!`;
      restartBtn = document.createElement("button");
      restartBtn.textContent = "Restart";
      restartBtn.addEventListener("click", (event) => {
        container.removeChild(restartBtn);
        startNewGame();
      });
      container.appendChild(restartBtn);
    }
  }

  function boxClicked(i, j, piece) {
    const currPlayer = game.getActivePlayer().piece;
    const piecePlaced = game.playRound(i, j);
    if (piecePlaced) {
      piece.textContent = currPlayer;
      displayPlayerTurn(turnH1);
    }

    gameComplete();
  }

  const displayPlayerTurn = (headerElement) => {
    headerElement.textContent = `${game.getActivePlayer().name}'s turn.`;
  };

  function startNewGame() {
    game.restartGame();
    generateBoard();
    displayPlayerTurn(turnH1);
  }

  function generateBoard() {
    const gameUi = document.querySelector(".game-ui");
    while (gameUi.firstChild) {
      gameUi.removeChild(gameUi.firstChild);
    }

    const board = document.createElement("div");
    board.classList.add("board");
    gameUi.appendChild(board);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const boardItem = document.createElement("div");
        boardItem.classList.add(`row-${i}`, `col-${j}`);

        board.appendChild(boardItem);
        boardItem.addEventListener("click", () => {
          boxClicked(i, j, boardItem);
        });
      }
    }
  }
}

ScreenController();
