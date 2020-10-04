const styles = (theme) => {
  return {
    mainContainer: {
      flex: 1,
      paddingHorizontal: theme.globals.horizontalGutter,
    },

    scrollContainer: {
    },

    row: {
      height: theme.globals.taskItemHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    rowText: {
      fontWeight: theme.weights.regular,
      fontSize: 14,
    },

    rowDot: {
      height: 12,
      width: 12,
      borderRadius: 2,
      borderColor: theme.colors.black,
    },

    bottomContainer: {
      marginBottom: theme.globals.bottomGutter,
      height: theme.globals.tabBarHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },

    versionContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },

    version: {
      opacity: theme.globals.blurOpacity,
      fontWeight: theme.weights.regular,
      fontSize: 14,
    },
  }
}

export default styles
