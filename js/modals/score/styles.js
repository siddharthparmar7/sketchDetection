import { StyleSheet } from 'react-native'
import theme from '../../config/theme'

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: theme.colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextButton: {
    margin: 20,
    backgroundColor: theme.colors.accent
  },
  buttonText: {
    padding: 10,
    fontSize: 20
  }
})

export default styles
