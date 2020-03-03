const styles = (theme) => {
  return {
    mainContainer: {
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

    text: {
      fontSize: 15,
      fontWeight: theme.weights.regular,
    },
  }
}

export default styles
