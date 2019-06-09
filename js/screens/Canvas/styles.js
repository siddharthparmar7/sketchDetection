import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../config/theme'

const styles = StyleSheet.create({
  canvasContainer: {
    flex: 1
  },
  topBar: {
    backgroundColor: theme.colors.primary
  },
  canvasControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50
  },
  drawTarget: {
    marginVertical: 20,
    alignItems: 'center'
  },
  button: {
    backgroundColor: theme.colors.accent,
    padding: 15,
    borderRadius: 10
  },
  topBarText: {
    color: 'white',
    textTransform: 'uppercase'
  },
  canvas: {
    flex: 1
  },
  floatingIcon: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30
  },
  detectedLable: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  detectedLableText: {
    fontSize: 18
  }
})

export default styles
