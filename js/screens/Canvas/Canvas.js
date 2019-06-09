import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import SettingsModal from '../../modals/Settings'
import { CanvasContext } from '../../context/CanvasContext'
import AppText from '../../components/AppText'
import theme from '../../config/theme'

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
        <View style={styles.topBar}>
          <View style={styles.canvasControl}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => {
                canvasRef.clear()
                resetLabel()
              }}
            >
              <AppText style={styles.topBarText}>Clear</AppText>
            </TouchableOpacity>
            {/* 
            ********************
            Decide feature = Label image on save or on stroke end
            In this case it is on stroke end
            ********************
          */}
            <TouchableOpacity
              activeOpacity={0.8}
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
              <AppText style={styles.topBarText}>Save</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => {
                canvasRef.undo()
              }}
            >
              <AppText style={styles.topBarText}>Undo</AppText>
            </TouchableOpacity>
          </View>
          <View style={styles.drawTarget}>
            <AppText>Draw: Face</AppText>
          </View>
        </View>
        <SketchCanvas
          ref={ref => (canvasRef = ref)}
          style={styles.canvas}
          strokeColor={canvasState.strokeColor}
          strokeWidth={canvasState.strokeWidth}
          // onStrokeEnd={() => {
          //   canvasRef.getBase64('jpg', true, true, false, true, (err, data) => {
          //     if (err) setError(err)
          //     else detectLabel(data)
          //   })
          // }}
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
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.floatingIcon}
          onPress={() => toggleSettingsModal()}
        >
          <Icon name="settings" size={35} color={theme.colors.accent} />
        </TouchableOpacity>
        {canvasState.showSettingsModal && <SettingsModal />}
      </View>
    )}
  </CanvasContext.Consumer>
)

export default Canvas
