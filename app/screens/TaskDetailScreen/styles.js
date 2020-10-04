const styles = (theme) => {
  const { horizontalGutter, taskItemHeight } = theme.globals

  return {
    mainContainer: {
      flex: 1,
      backgroundColor: theme.dynamics.background,
    },

    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: taskItemHeight,
      paddingHorizontal: horizontalGutter,
      backgroundColor: theme.dynamics.background,
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
      color: theme.dynamics.foreground,
    },
  }
}

export default styles
