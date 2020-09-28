const styles = (theme) => {
  return {
    mainContainer: {
      flex: 1,
    },

    list: {
      flex: 1,
    },

    itemContainer: {
      position: 'relative',
    },

    item: {
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

    textContainer: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
    },

    text: {
      fontWeight: theme.weights.regular,
      fontSize: 16,
    },

    swipeBackground: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
    },
  }
}

export default styles
