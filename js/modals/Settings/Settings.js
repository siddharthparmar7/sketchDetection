import React from 'react'
import { Modal, Text, TouchableHighlight, View } from 'react-native'
import { CanvasContext } from '../../context/CanvasContext'
import colors from './colorList'
import styles from './styles'
import AppText from '../../components/AppText'
import Slider from '@react-native-community/slider'

const SettingsModal = props => (
  <CanvasContext.Consumer>
    {({
      toggleSettingsModal,
      changeStrokeColor,
      changeStrokeWidth,
      canvasState
    }) => (
      <Modal animationType="slide" transparent={false}>
        <View style={styles.modalContent}>
          <TouchableHighlight
            underlayColor="white"
            activeOpacity={0.8}
            onPress={() => toggleSettingsModal()}
          >
            <Text style={styles.closeX}>X</Text>
          </TouchableHighlight>
          <AppText style={styles.settingsTitle}>Pick a color: </AppText>
          <View style={styles.boxWrapper}>
            {colors.map((color, index) => (
              <TouchableHighlight
                key={index}
                underlayColor="white"
                activeOpacity={0.8}
                style={{ backgroundColor: color, ...styles.colorBox }}
                onPress={() => changeStrokeColor(color)}
              >
                <View />
              </TouchableHighlight>
            ))}
          </View>
          <AppText style={styles.settingsTitle}>Pick a stroke width: </AppText>
          <View style={styles.strokeWrapper}>
            <Slider
              style={styles.slider}
              value={canvasState.strokeWidth}
              minimumValue={5}
              maximumValue={50}
              onSlidingComplete={value => changeStrokeWidth(value)}
            />
          </View>
        </View>
      </Modal>
    )}
  </CanvasContext.Consumer>
)

export default SettingsModal
