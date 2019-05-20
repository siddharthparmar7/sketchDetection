import React, { Component } from 'react'
import Canvas from './Canvas'
import { API_KEY } from 'react-native-dotenv'

export default class CanvasComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: ''
    }
  }

  resetLabel = () => {
    this.setState({ label: '' })
  }

  detectLabel = async base64String => {
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
    }
    const res = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      }
    )

    const data = await res.json()
    data.responses.map(res =>
      res.labelAnnotations.map(label => {
        this.setState({ label: label.description })
      })
    )
  }

  render() {
    return (
      <Canvas
        detectLabel={this.detectLabel}
        resetLabel={this.resetLabel}
        detectedLable={this.state.label}
      />
    )
  }
}
