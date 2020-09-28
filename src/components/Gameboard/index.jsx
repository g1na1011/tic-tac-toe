import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Square from '../Square';
import {
  findEmptySquareIndices,
  getScore,
  getScoreForMove,
  minimax,
  checkForWinner,
} from '../../utils/helpers';
import { COMPUTER, PLAYER, DRAW } from '../../utils/constants';

const Gameboard = () => {
  const [gameboard, setGameboard] = useState({});
  const [winner, setWinner] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  
  const isTied = !winner && findEmptySquareIndices(gameboard).length === 0;
  
  useEffect(() => {
    if (isTied) { 
      setWinner(DRAW);
      return; 
    }
    if (!isPlayerTurn && !winner) {
      // computer makes a move
      let move = {};
      const availableSquares = findEmptySquareIndices(gameboard);
      
      if (availableSquares.length === 9) {
        move.index = 1;
      } else {
        move = getScoreForMove({ ...gameboard });
      }
      const newGameboard = { ...gameboard, [move.index]: COMPUTER };
      const hasWinner = checkForWinner(newGameboard);
      if (hasWinner) {
        setWinner(COMPUTER);
      }
      setGameboard(newGameboard);
      setIsPlayerTurn(true);
    }
  }, [isPlayerTurn]);
  
  const handlePlayerMove = (index) => {
    if (!isPlayerTurn || gameboard[index] || winner) {
      return;
    }
    
    const newGameboard = { ...gameboard, [index]: PLAYER };    
    const hasWinner = checkForWinner(newGameboard);
    if (hasWinner) {
      setWinner(PLAYER);
    }
    setGameboard(newGameboard);
    setIsPlayerTurn(false);
  };
  
  const handleResetGameboard = () => {
    setGameboard({});
    setWinner(null);
    setIsPlayerTurn(true);
  };
  
  const renderResetButton = () => (
    <ResetButton onClick={handleResetGameboard} displayMargin={!winner}>
      Reset Game!
    </ResetButton>
  );
  
  return (
    <>
      <GameBoardContainer>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareIndex) => (
            <Square 
              key={squareIndex} 
              squareIndex={squareIndex} 
              value={gameboard[squareIndex]} 
              handlePlayerMove={(idx) => handlePlayerMove(idx)}
            />
          ))
        }
      </GameBoardContainer>
      {winner && (
        <WinnerText>
          THE WINNER IS: {
            winner === COMPUTER 
              ? 'THE COMPUTER!' 
              : winner === DRAW 
              ? 'TIED!' 
              : 'YOU!'
          }
        </WinnerText>
      )}
      {renderResetButton()}
    </>
  );
};

const GameBoardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  flex-flow: wrap;
  position: relative;
`;
const BoardRow = styled.div`
  display: flex;
`;
const ResetButton = styled.button`
  font-size: 14px;
  margin-top: ${props => props.displayMargin ? '20px' : '0'};
  border: 2px solid #FA5;
  border-radius: 4px;
  padding: 10px 20px;
  background-color: white;
`;
const WinnerText = styled.h2`
  margin-top: 20px;
`;

export default Gameboard;
