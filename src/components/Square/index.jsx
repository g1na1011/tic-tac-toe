import React from 'react';
import styled from 'styled-components';

const Square = ({
  squareIndex,
  value,
  handlePlayerMove,
}) => {  
  const handleClick = () => {
    if (value) { 
      return;
    }
    handlePlayerMove(squareIndex);
  };
  return (
    <SquareContainer onClick={handleClick}>
      {value}
    </SquareContainer>
  );
};

const SquareContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export default Square;