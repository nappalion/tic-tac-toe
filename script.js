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
      return true;
    }

    // Leading Diagonal /
    let piecesInLeadDiag = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = cols - 1; j >= 0; j--) {
        const piece = board[i][j];
        if (piece.getValue() === player) {
          piecesInLeadDiag += 1;
        }
      }
      if (piecesInLeadDiag === 3) {
        return true;
      }
    }

    return false;
  };

  const placePiece = (row, col, player) => {
    if (
      row >= 0 &&
      row < board.length &&
      col >= 0 &&
      col < board[0].length &&
      board[row][col].getValue() == 0
    ) {
      board[row][col].addPiece(player);
      return true;
    } else {
      return false;
    }
  };

  const printBoard = () => {
    for (let i = 0; i < rows; i++) {
      lineToPrint = "";
      for (let j = 0; j < cols; j++) {
        lineToPrint += board[i][j].getValue();
      }
      console.log(lineToPrint);
    }
  };

  return { getBoard, placePiece, printBoard, checkWin };
}

// Each cell holds a value: 0-no player; 1/2-player
function Cell() {
  let value = 0;

  const addPiece = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addPiece, getValue };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = GameBoard();
  let gameComplete = false;

  const players = [
    {
      name: playerOneName,
      piece: 1,
    },
    {
      name: playerTwoName,
      piece: 2,
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    if (!gameComplete) {
      console.log(
        `Placing ${
          getActivePlayer().name
        }'s piece into row [${row}] and column [${column}]`
      );
      board.placePiece(row, column, activePlayer.piece);

      if (board.checkWin(activePlayer.piece)) {
        gameComplete = true;
        return false;
      }

      switchPlayerTurn();
      printNewRound();
      return true;
    } else {
      console.log(`Sorry, ${activePlayer.name} already won the game.`);
      return false;
    }
  };

  return { playRound, getActivePlayer };
}

function ScreenController() {
  const game = GameController();
}
