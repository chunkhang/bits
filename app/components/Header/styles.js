const styles = (theme) => {
  return {
    mainContainer: {
      paddingHorizontal: theme.globals.horizontalGutter,
      paddingTop: theme.globals.topGutter,
    },

    header: {
      flexDirection: 'row',
      height: 24,
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },

    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },

    title: {
      fontWeight: theme.weights.medium,
      textTransform: 'uppercase',
      fontSize: 12,
    },

    divider: {
      height: 1,
      marginTop: 12,
    },
  }
}

export default styles
