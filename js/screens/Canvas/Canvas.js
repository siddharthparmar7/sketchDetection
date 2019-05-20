import React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import SettingsModal from '../../modals/Settings'
import { CanvasContext } from '../../context/CanvasContext'

const Canvas = ({ detectLabel, detectedLable, resetLabel }) => (
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
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableHighlight>
          <TouchableHighlight
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
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="#ffff6b"
            style={styles.button}
            onPress={() => {
              canvasRef.undo()
            }}
          >
            <Text style={styles.buttonText}>Undo</Text>
          </TouchableHighlight>
        </View>
        <SketchCanvas
          ref={ref => (canvasRef = ref)}
          style={styles.canvas}
          strokeColor={canvasState.strokeColor}
          strokeWidth={canvasState.strokeWidth}
        />
        <View style={styles.detectedLable}>
          <Text style={styles.detectedLableText}>
            I think it is a {detectedLable ? detectedLable : '...'}
          </Text>
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
