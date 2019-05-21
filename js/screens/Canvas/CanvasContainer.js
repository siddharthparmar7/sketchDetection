import React, { Component } from 'react'
import Canvas from './Canvas'
import { API_KEY } from 'react-native-dotenv'

export default class CanvasComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      error: null,
      loading: false
    }
  }

  resetLabel = () => {
    this.setState({ label: '', error: null, loading: false })
  }

  setError = error => {
    this.setState({ error: error })
  }

  detectLabel = async base64String => {
    this.setState({ loading: true })
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
      )
      const data = await res.json()
      data.responses.map(res => {
        res.labelAnnotations.map(label => {
          this.setState({
            loading: false,
            label: label.description,
            error: null
          })
        })
      })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  render() {
    return (
      <Canvas
        detectLabel={this.detectLabel}
        loading={this.state.loading}
        error={this.state.error}
        setError={this.setError}
        resetLabel={this.resetLabel}
        detectedLabel={this.state.label}
      />
    )
  }
}
