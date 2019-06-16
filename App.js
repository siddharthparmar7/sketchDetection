import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { GameContextProvider } from './js/context/GameContext';
import CanvasWrapper from './js/context/CanvasContext';
import Canvas from './js/screens/Canvas';

export default class App extends Component {
  render() {
    return (
      <GameContextProvider>
        <CanvasWrapper>
          <StatusBar hidden={true} />
          <Canvas />
        </CanvasWrapper>
      </GameContextProvider>
    );
  }
}
