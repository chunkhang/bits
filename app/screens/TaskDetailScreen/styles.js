const styles = (theme) => {
  const {
    horizontalGutter,
    bottomGutter,
    tabBarHeight,
    taskItemHeight,
  } = theme.globals

  return {
    mainContainer: {
      flex: 1,
    },

    primaryContainer: {
      flex: 1,
      marginBottom: bottomGutter + tabBarHeight,
    },

    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: taskItemHeight,
      paddingHorizontal: horizontalGutter,
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
      position: 'absolute',
      bottom: bottomGutter,
      height: tabBarHeight,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }
}

export default styles
