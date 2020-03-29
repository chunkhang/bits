const styles = (theme) => {
  return {
    mainContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingHorizontal: 24,
      paddingBottom: 24,
      alignItems: 'center',
    },

    buttonStyle: {
      width: 36,
      height: 36,
      borderRadius: 2,
      backgroundColor: theme.colors.blue,
    },
  }
}

export default styles
