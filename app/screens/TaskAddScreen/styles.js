const styles = (theme) => {
  return {
    mainContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: theme.colors.white,
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
      // Fix alignment for clear button
      marginRight: -6,
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

  }
}

export default styles
