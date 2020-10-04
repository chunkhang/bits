const styles = (theme, dynamic) => {
  const { whiteTranslucent, blackTranslucent } = theme.colors
  return {
    mainContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: dynamic(whiteTranslucent, blackTranslucent),
    },
  }
}

export default styles
