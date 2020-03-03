const styles = (theme) => {
  return {
    mainContainer: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },

    headerItem: {
      flex: 1,
    },

    headerItemTabs: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },

    headerItemCount: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    tabName: {
      fontWeight: theme.weights.medium,
      textTransform: 'uppercase',
      fontSize: 12,
    },

    tabIcon: {
      borderRadius: 2,
    },

    tabCount: {
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
