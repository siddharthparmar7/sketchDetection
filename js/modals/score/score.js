import React from 'react'
import { View, Modal, TouchableOpacity } from 'react-native'
import AppText from '../../components/AppText'
import styles from './styles'

const ScoreModal = ({ toggleScoreModal, resetLabel }) => (
  <Modal animationType="slide" transparent={false}>
    <View style={styles.modalContainer}>
      <AppText>Excellent!</AppText>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.nextButton}
        onPress={() => {
          toggleScoreModal()
          resetLabel()
        }}
      >
        <AppText style={styles.buttonText}>Next</AppText>
      </TouchableOpacity>
    </View>
  </Modal>
)

export default ScoreModal
