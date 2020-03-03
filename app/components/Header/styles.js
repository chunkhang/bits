const styles = (theme) => {
  return {
    mainContainer: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },

    header: {
      flexDirection: 'row',
      height: 24,
    },

    item: {
      flex: 1,
      height: '100%',
      justifyContent: 'flex-end',
    },

    middleItem: {
      alignItems: 'center',
    },

    rightItem: {
      alignItems: 'flex-end',
    },

    title: {
      fontWeight: theme.weights.medium,
      textTransform: 'uppercase',
      fontSize: 12,
    },

    subtitle: {
      fontWeight: theme.weights.light,
      fontSize: 12,
    },

    divider: {
      height: 1,
      marginTop: 12,
    },
  }
}

export default styles
