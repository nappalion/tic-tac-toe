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
      console.log("------");
    }
  };

  return { getBoard, placePiece, printBoard };
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
    console.log(
      `Placing ${
        getActivePlayer().name
      }'s piece into row [${row}] and column [${column}]`
    );
    board.placePiece(row, column, activePlayer.piece);

    switchPlayerTurn();
    printNewRound();
  };

  return { playRound, getActivePlayer };
}

