import React, { Component } from 'react'

export const CanvasContext = React.createContext()

export default class CanvasWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      strokeColor: 'black',
      strokeWidth: 7,
      showSettingsModal: false
    }
    this.canvas = React.createRef()
  }

  toggleSettingsModal = () => {
    this.setState({ showSettingsModal: !this.state.showSettingsModal })
  }

  handleStrokeColorChange = color => {
    this.setState({ strokeColor: color })
  }

  handleStrokeWidthChange = width => {
    this.setState({ strokeWidth: width })
  }

  render() {
    return (
      <CanvasContext.Provider
        value={{
          canvasState: this.state,
          canvasRef: this.canvas,
          toggleSettingsModal: this.toggleSettingsModal,
          changeStrokeColor: this.handleStrokeColorChange,
          changeStrokeWidth: this.handleStrokeWidthChange
        }}
      >
        {this.props.children}
      </CanvasContext.Provider>
    )
  }
}
