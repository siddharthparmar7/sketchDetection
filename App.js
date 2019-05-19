import React, { Component } from 'react'
import CanvasWrapper from './js/context/CanvasContext'
import Canvas from './js/screens/Canvas'

export default class App extends Component {
  render() {
    return (
      <CanvasWrapper>
        <Canvas />
      </CanvasWrapper>
    )
  }
}
