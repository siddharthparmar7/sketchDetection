import React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import SettingsModal from '../../modals/Settings'
import { CanvasContext } from '../../context/CanvasContext'
import AppText from '../../components/AppText'

const decideConstantOrVowel = word => {
  return ['A', 'E', 'I', 'O', 'U'].includes(word[0]) ? 'an' : 'a'
}

const Canvas = ({
  detectLabel,
  detectedLabel,
  resetLabel,
  setError,
  error,
  loading
}) => (
  <CanvasContext.Consumer>
    {({ canvasState, canvasRef, toggleSettingsModal }) => (
      <View style={styles.canvasContainer}>
        <View style={styles.canvasControl}>
          <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="#ffff6b"
            style={styles.button}
            onPress={() => {
              canvasRef.clear()
              resetLabel()
            }}
          >
            <AppText style={styles.buttonText}>Clear</AppText>
          </TouchableHighlight>
          {/* 
            ********************
            Decide feature = Label image on save or on stroke end
            In this case it is on stroke end
            ********************
          */}
          {/* <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="#ffff6b"
            style={styles.button}
            onPress={() => {
              canvasRef.getBase64(
                'jpg',
                true,
                true,
                false,
                true,
                (err, data) => {
                  if (err) console.log(err)
                  else detectLabel(data)
                }
              )
            }}
          >
            <AppText style={styles.buttonText}>Save</AppText>
          </TouchableHighlight> */}
          <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="#ffff6b"
            style={styles.button}
            onPress={() => {
              canvasRef.undo()
            }}
          >
            <AppText style={styles.buttonText}>Undo</AppText>
          </TouchableHighlight>
        </View>
        <SketchCanvas
          ref={ref => (canvasRef = ref)}
          style={styles.canvas}
          strokeColor={canvasState.strokeColor}
          strokeWidth={canvasState.strokeWidth}
          onStrokeEnd={() => {
            canvasRef.getBase64('jpg', true, true, false, true, (err, data) => {
              if (err) setError(err)
              else detectLabel(data)
            })
          }}
        />
        <View style={styles.detectedLable}>
          <AppText style={styles.detectedLableText}>
            {error
              ? 'There was an error. Try again.'
              : loading
              ? '...'
              : `I think it is ${decideConstantOrVowel(detectedLabel)} ${
                  detectedLabel ? detectedLabel : '...'
                }`}
          </AppText>
        </View>
        <TouchableHighlight
          activeOpacity={0.8}
          style={styles.floatingIcon}
          onPress={() => toggleSettingsModal()}
        >
          <Icon name="settings" size={35} color="#900" />
        </TouchableHighlight>
        {canvasState.showSettingsModal && <SettingsModal />}
      </View>
    )}
  </CanvasContext.Consumer>
)

export default Canvas
