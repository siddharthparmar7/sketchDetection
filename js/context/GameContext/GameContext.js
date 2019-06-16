import React, { Component, createContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { API_KEY } from 'react-native-dotenv';
import gameLevels from '../../assets/levels/';

const GameContext = createContext();

class GameContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: null,
      detectedLabel: '',
      error: null,
      loading: false,
      scoreModalOpen: false
    };
  }

  componentDidMount() {
    const currentLevel = gameLevels[0];
    this.setState({ currentLevel });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.detectedLabel !== this.state.detectedLabel) {
      if (
        this.state.detectedLabel.toLowerCase() ===
        this.state.currentLevel.draw.toLowerCase()
      ) {
        setTimeout(() => {
          this.setState({ scoreModalOpen: !this.state.scoreModalOpen });
        }, 800);
      }
    }
  }

  toggleScoreModal = () => {
    this.setState({ scoreModalOpen: !this.state.scoreModalOpen });
  };

  resetLabel = () => {
    this.setState({ detectedLabel: '', error: null, loading: false });
  };

  setError = error => {
    this.setState({ error: error });
  };

  goToNextLevel = () => {
    const currentLevelIndex = gameLevels.findIndex(
      () => this.state.currentLevel
    );
    if (currentLevelIndex !== -1) {
      this.setState({ currentLevel: gameLevels[currentLevelIndex + 1] });
    }
  };

  checkScore = detectedLabel => {
    return this.state.currentLevel.draw.toLowerCase() ===
      detectedLabel.toLowerCase()
      ? true
      : false;
  };

  detectLabel = async base64String => {
    this.setState({ loading: true });
    const reqBody = {
      requests: [
        {
          image: {
            content: base64String
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 1
            }
          ]
        }
      ]
    };
    try {
      const res = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqBody)
        }
      );
      const data = await res.json();
      data.responses.map(res => {
        res.labelAnnotations.map(label => {
          this.setState({
            loading: false,
            detectedLabel: label.description,
            error: null
          });
        });
      });
    } catch (error) {
      this.setState({ loading: false, error });
    }
  };

  render() {
    return this.state.currentLevel ? (
      <GameContext.Provider
        value={{
          ...this.state,
          goToNextLevel: this.goToNextLevel,
          checkScore: this.checkScore,
          detectLabel: this.detectLabel,
          resetLabel: this.resetLabel,
          scoreModalOpen: this.state.scoreModalOpen,
          toggleScoreModal: this.toggleScoreModal
        }}
      >
        {this.props.children}
      </GameContext.Provider>
    ) : (
      <ActivityIndicator />
    );
  }
}

export { GameContextProvider };
export default GameContext;
