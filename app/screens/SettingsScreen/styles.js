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

    text: {
      fontWeight: theme.weights.regular,
      fontSize: 16,
    },
  }
}

export default styles
