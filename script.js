// NOTE: jQuery 3.1.1 is built-in to this environment
// Define global variables here as necessary

$(document).ready(function() {
  // Part 1: Setup - Clicks in each square should show "X" and "O" on the board

  const board = [...Array(3)].map(e => Array(3));

  let alternateSign = true;

  let count = 0;

  $('#board td').on('click', function(event) {
    event.preventDefault();
    if (!$(this).text()) {
      let id = $(this)
        .attr('id')
        .split('');

      alternateSign && $(this).text('X');
      !alternateSign && $(this).text('0');

      board[id[0]][id[2]] = $(this).text();

      count++;

      if (didWin(board)) {
        alert(`${$(this).text()} won!`);
        $('#board td').off();
      } else if (count === 9) {
        alert('DRAW GAME!');
        $('#board td').off();
      }
      alternateSign = !alternateSign;
    }
  });
  // It can be assumed that each click will alternate "X" and "O", imitating that 2 people are playing the game

  // Part 2: Logic - determine if there is a winner after each action, or if there is a draw at the end of the game

  // Part 3: Styling
});

/**
 * a helper function thats take a 2-dimensional array and checks for winning positions
 * @param {Array} board - a 2-dimensional (3x3) array
 */
function didWin(board) {
  /* check rows and colums */
  for (let i = 0; i < board.length; i++) {
    // rows
    if (hasWinner(board[i][0], board[i][1], board[i][2])) {
      return true;
    }
    // columns
    if (hasWinner(board[0][i], board[1][i], board[2][i])) {
      return true;
    }
  }

  /* check diagonals */

  // left to right diagonal
  if (hasWinner(board[0][0], board[1][1], board[2][2])) {
    return true;
  }

  // right to left diagonal
  if (hasWinner(board[0][2], board[1][1], board[2][0])) {
    return true;
  }

  // if we haven't found a winner by here there is no winner
  return false;
}

/**
 * A function that takes three slots and checks for
 *   equality to determine a win or not
 * @param {Any} slot1
 * @param {Any} slot2
 * @param {Any} slot3
 */
function hasWinner(slot1, slot2, slot3) {
  if (!slot1 || !slot2 || !slot3) {
    return false;
  }
  return slot1 === slot2 && slot2 === slot3;
}
