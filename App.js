import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import CanvasWrapper from './js/context/CanvasContext'
import Canvas from './js/screens/Canvas'

export default class App extends Component {
  render() {
    return (
      <CanvasWrapper>
        <StatusBar hidden={true} />
        <Canvas />
      </CanvasWrapper>
    )
  }
}
