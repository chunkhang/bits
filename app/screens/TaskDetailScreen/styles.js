const styles = (theme) => {
  return {
    mainContainer: {
      flex: 1,
    },

    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: theme.globals.taskItemHeight,
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
      flex: 1,
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

    actionContainer: {
      marginTop: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }
}

export default styles
