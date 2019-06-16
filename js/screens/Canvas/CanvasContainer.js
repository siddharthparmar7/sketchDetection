import React, { Component } from 'react';
import Canvas from './Canvas';
import ScoreModal from '../../modals/score';
import GameContext from '../../context/GameContext/GameContext';

export default class CanvasComponent extends Component {
  render() {
    return (
      <GameContext.Consumer>
        {context => {
          return context.scoreModalOpen ? (
            <ScoreModal
              toggleScoreModal={context.toggleScoreModal}
              resetLabel={context.resetLabel}
              goToNextLevel={context.goToNextLevel}
            />
          ) : (
            <Canvas
              currentLevel={context.currentLevel}
              detectLabel={context.detectLabel}
              loading={context.loading}
              error={context.error}
              resetLabel={context.resetLabel}
              detectedLabel={context.detectedLabel}
            />
          );
        }}
      </GameContext.Consumer>
    );
  }
}
