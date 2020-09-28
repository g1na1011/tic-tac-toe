import React from 'react';
import './App.css';
import styled from 'styled-components';
import Gameboard from './components/Gameboard';

const App = () => {
  return (
    <AppBody>
      <h1>TIC-TAC-TOE</h1>
      <Gameboard />
    </AppBody>
  );
};

const AppBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
