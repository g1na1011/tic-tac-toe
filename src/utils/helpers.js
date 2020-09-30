import { COMPUTER, PLAYER } from './constants';

export const findEmptySquareIndices = (board) => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(id => !board[id]);
};

export const getScore = (move) => {
  if (typeof move.score === "object") {
    return getScore(move.score);
  }
  return move.score;
}

export const getScoreForMove = (board) => {
  const availableSquares = findEmptySquareIndices(board);
  let move = {};

  if (availableSquares.length === 8 && !board[5]) {
    move = {
      index: 5,
    };
    return move;
  }

  const scoreBoard = {};
  availableSquares.forEach((idx) => {
    scoreBoard[idx] = minimax({ ...board, [idx]: COMPUTER }, true);
  });

  const indices = Object.keys(scoreBoard);
  indices.forEach((idx) => {
    // if next move === -10 winning move, if no winning move, pick a move where minimaxNextmove is undefined because that's where oponent have no winning move
    if ((scoreBoard[idx] === -10) || (!scoreBoard[idx] && move.score !== -10)) {
      move.index = idx;
      move.score = scoreBoard[idx];
    }
  });

  return move;
};

export const minimax = (board, isUser) => {
  const play = isUser ? PLAYER : COMPUTER;
  const availableSquares = findEmptySquareIndices(board);

  if (checkForWinner(board) && isUser) {
    return -10;
  }
  if (checkForWinner(board) && !isUser) {
    return 10;
  }
  if (availableSquares.length === 0) {
    return 0;
  }

  const moves = [];
  availableSquares.forEach((idx) => {
    let move = { index: idx };
    if (isUser) {
      const result = minimax({ ...board, [idx]: play }, false);
      move.score = result;
    } else {
      const result = minimax({ ...board, [idx]: play }, true);
      move.score = result;
    }
    moves.push(move);
  });

  let bestMove;
  if (!isUser) {
    for(let i = 0; i < moves.length; i++){
      const finalScore = getScore(moves[i]);
      if (finalScore === -10) {
        bestMove = i;
      }
    }
  } else {
    for (let i = 0; i < moves.length; i++) {
      const finalScore = getScore(moves[i]);
      if (finalScore === 10) {
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
};

const checkCombo = (a, b, c) => {
  const allFilled = a && b && c;
  if (!allFilled) { return false }

  const allEqual = a === b && a === c;
  return allEqual;
}

export const checkForWinner = (board) => {
  // horizontal win possibilities
  if (checkCombo(board[1],board[2],board[3])) { return true }
  if (checkCombo(board[4],board[5],board[6])) { return true }
  if (checkCombo(board[7],board[8],board[9])) { return true }

  // vertical win possibilities
  if (checkCombo(board[1],board[4],board[7])) { return true }
  if (checkCombo(board[2],board[5],board[8])) { return true }
  if (checkCombo(board[3],board[6],board[9])) { return true }

  // diagonal win possibilities
  if (checkCombo(board[1],board[5],board[9])) { return true }
  if (checkCombo(board[7],board[5],board[3])) { return true }

  return false;
};
