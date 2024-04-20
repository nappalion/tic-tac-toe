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
      board[row][col] == 0
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
        lineToPrint += board[i][j];
      }
      console.log(lineToPrint);
      console.log("------");
    }
  };

  return { getBoard, placePiece, printBoard };
}

function Cell() {
  let value = 0;

  const addPiece = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addPiece, getValue };
}
