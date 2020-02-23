const styles = () => {
  return {
    mainContainer: {
      marginHorizontal: 24,
      marginTop: 24,
      marginBottom: 12,
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
      fontWeight: '500',
      textTransform: 'uppercase',
      fontSize: 12,
    },

    tabIcon: {
      borderRadius: 2,
    },

    tabCount: {
      fontWeight: '300',
      fontSize: 12,
    },

    divider: {
      height: 1,
      marginVertical: 12,
    },
  }
}

export default styles
