const styles = (theme) => {
  return {
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 56,
      paddingHorizontal: theme.globals.horizontalGutter,
      backgroundColor: theme.colors.white,
    },

    dot: {
      height: 12,
      width: 12,
      borderRadius: 2,
      marginRight: 12,
    },

    containerStyle: {
      paddingHorizontal: 0,
      // Not sure why it's 1 pixel off
      // when compared to Text
      marginTop: 1,
    },

    inputContainerStyle: {
      height: '100%',
      borderBottomWidth: 0,
    },

    inputStyle: {
      marginTop: 0,
      fontSize: 16,
      fontWeight: theme.weights.regular,
    },

    textContainer: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
    },
  }
}

export default styles
