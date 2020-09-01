const styles = (theme) => {
  return {
    mainContainer: {
      flex: 1,
      paddingHorizontal: theme.globals.horizontalGutter,
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
  }
}

export default styles
