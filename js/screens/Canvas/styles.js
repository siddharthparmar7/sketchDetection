import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  canvasContainer: {
    flex: 1
  },
  canvasControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50
  },
  button: {
    backgroundColor: '#fdd835',
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
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
