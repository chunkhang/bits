const styles = (theme) => {
  return {
    mainContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },

    body: {
      paddingHorizontal: 24,
      paddingVertical: 12,
    },

    task: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 32,
    },

    dot: {
      backgroundColor: theme.colors.yellow,
      height: 12,
      width: 12,
      borderRadius: 2,
      marginRight: 12,
    },

    containerStyle: {
      flex: 1,
      paddingHorizontal: 0,
    },

    inputContainerStyle: {
      height: '100%',
      width: '100%',
      borderBottomWidth: 0,
    },

    inputStyle: {
      fontSize: 16,
    },
  }
}

export default styles
