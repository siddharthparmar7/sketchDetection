import React, { Component } from 'react';
import Canvas from './Canvas';
import { API_KEY } from 'react-native-dotenv';
import ScoreModal from '../../modals/score';
import GameContext from '../../context/GameContext/GameContext';

export default class CanvasComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreModalOpen: false
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.label !== this.state.label) {
  //     console.log('here');
  //     if (this.state.label === 'Face') {
  //       setTimeout(() => {
  //         this.setState({ scoreModalOpen: !this.state.scoreModalOpen });
  //       }, 800);
  //     }
  //   }
  // }

  toggleScoreModal = () => {
    this.setState({ scoreModalOpen: !this.state.scoreModalOpen });
  };

  render() {
    return (
      <GameContext.Consumer>
        {context => {
          return this.state.scoreModalOpen ? (
            <ScoreModal
              toggleScoreModal={this.toggleScoreModal}
              resetLabel={context.resetLabel}
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
