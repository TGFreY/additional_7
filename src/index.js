module.exports = function solveSudoku(matrix) {
  let coordinates = getFreeCellCoord(matrix);

  if (coordinates[0] == "matrix is full") {
    return matrix;
  }

  let row = coordinates[0];
  let col = coordinates[1];

  for (let pretender = 1; pretender < 10; pretender++) {
    if (checkRolColNums(matrix, row, col, pretender) && checkSquareNums(matrix, row, col, pretender)) {
      matrix[row][col] = pretender;
      if (solveSudoku(matrix)) {
        return matrix;
      }
      matrix[row][col] = 0;
    }
  }
  return false;
};

function getFreeCellCoord(matrix) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (matrix[row][col] == 0) {
        return [row, col];
      }
    }
  }
  return ["matrix is full"];
}

function checkSquareNums(matrix, row, col, pretender) {
  let sqRowX = row < 6 ? (row < 3 ? 0 : 3) : 6;
  let sqColY = col < 6 ? (col < 3 ? 0 : 3) : 6;
  for (let sqRow = 0; sqRow < 3; sqRow++) {
    for (let sqCol = 0; sqCol < 3; sqCol++) {
      if (matrix[sqRow + sqRowX][sqCol + sqColY] == pretender) {
        return false;
      }
    }
  }
  return true;
}

function checkRolColNums(matrix, row, col, pretender) {
  let rowNums = [].concat(matrix[row]);
  let colNums = [].concat(matrix.map(row => row[col]));
  if (rowNums.includes(pretender) || colNums.includes(pretender)) {
    return false;
  }
  return true;
}
