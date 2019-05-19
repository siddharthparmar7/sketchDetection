import React from 'react'
import { Modal, Text, TouchableHighlight, View } from 'react-native'
import { CanvasContext } from '../../context/CanvasContext'
import colors from './colorList'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

const SettingsModal = props => (
  <CanvasContext.Consumer>
    {({ toggleSettingsModal, changeStrokeColor, changeStrokeWidth }) => (
      <Modal animationType="slide" transparent={false}>
        <View style={styles.modalContent}>
          <TouchableHighlight
            underlayColor="white"
            activeOpacity={0.8}
            onPress={() => toggleSettingsModal()}
          >
            <Text style={styles.closeX}>X</Text>
          </TouchableHighlight>
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
          <View style={styles.strokeWrapper}>
            {[7, 9, 16, 18, 20, 25, 30, 35, 40, 50].map(
              (strokeWidth, index) => (
                <TouchableHighlight
                  key={index}
                  underlayColor="white"
                  activeOpacity={0.8}
                  onPress={() => changeStrokeWidth(strokeWidth)}
                >
                  <Icon size={strokeWidth} name="lens" />
                </TouchableHighlight>
              )
            )}
          </View>
        </View>
      </Modal>
    )}
  </CanvasContext.Consumer>
)

export default SettingsModal
