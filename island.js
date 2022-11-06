// returns an array of all adjacent nodes that are 1's inclding diagonals
function getNeighbors(row, column, matrix) {
  let newArr = [];

    //left top diagonal = row - 1, column - 1;
    if (row - 1 >= 0 && column - 1 >= 0 ) {
      if (matrix[row - 1][column - 1] === 1) {
        newArr.push([row - 1, column - 1]);
      }
    }

    //top = row - 1;
    if (row - 1 >= 0 && matrix[row - 1].length >= column + 1) {
      if (matrix[row - 1][column] === 1) {
        newArr.push([row - 1, column])
      }
    }

    //right top diagonal = row - 1, column + 1;
    if (row - 1 >= 0 && matrix[row - 1].length >= column + 2) {
      if (matrix[row - 1][column + 1] === 1) {
        newArr.push([row - 1, column + 1]);
      }
    }

    //left = column - 1;
    if (column - 1 >= 0) {
      if (matrix[row][column - 1] === 1) {
        newArr.push([row, column - 1]);
      }
    }

    //right = column + 1;
    if (matrix[row].length >= column + 2) {
      if (matrix[row][column + 1] === 1) {
        newArr.push([row, column + 1])
      }
    }

    //left bottom diagonal = row + 1, column - 1;
    if (matrix.length >= row + 2 && column - 1 >= 0) {
      if (matrix[row + 1][column - 1] === 1) {
        newArr.push([row + 1, column - 1]);
      }
    }

    //bottom = row + 1
    if (matrix.length >= row + 2 && matrix[row + 1].length >= column + 1) {
      if (matrix[row + 1][column] === 1) {
        newArr.push([row + 1, column]);
      }
    }

    //right bottom diagonal = row + 1; bottom + 1;
    if (matrix.length >= row + 2 && matrix[row + 1].length >= column + 2) {
      if (matrix[row + 1][column + 1] === 1) {
        newArr.push([row + 1, column + 1]);
      }
    }

    return newArr;
  }

// returns array of all nodes that could start an island(1);
function findStarts(matrix) {
  let newArr = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 1) newArr.push([i, j])
    }
  }
  return newArr;
}

function traversal(node, set, matrix) {
  let stack = [node];
  set.add(node.join(","))
  while (stack.length) {
    let curr = stack.pop();
    let neighbors = getNeighbors(curr[0], curr[1], matrix);
    for (let node of neighbors) {
      if (!set.has(node.join(","))) {
        stack.push(node);
        set.add(node.join(","));
      }
    }
  }
  return set;
}

function countIslands(matrix) {
  let starts = findStarts(matrix);
  let set = new Set();
  let count = 0;
  for (let node of starts) {
    if (!set.has(node.join(","))) {
      count++;
      set = traversal(node, set, matrix);
    }
  }
  return count;
}

// Uncomment the lines below for local testing
// const matrix = [
//                 [1,1,1,0,0],
//                 [0,1,1,0,1],
//                 [0,1,1,0,1]
//               ]

// console.log(getNeighbors(1, 1, matrix)); // [[0, 0], [0, 1], [0, 2], [1, 2], [2, 1], [2, 2]]
// console.log(getNeighbors(2,4, matrix)) // [[1,4]]

// const matrix2 = [
//                     [1,1,1,0,1],
//                     [0,0,0,0,1],
//                     [1,0,0,1,0],
//                 ]

// console.log(countIslands(matrix)) // 2
// console.log(countIslands(matrix2)); // 3

module.exports = [countIslands, getNeighbors];
