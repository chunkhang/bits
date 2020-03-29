const styles = (theme) => {
  return {
    mainContainer: {
      paddingHorizontal: 24,
      paddingTop: 24,
      backgroundColor: theme.colors.white,
    },

    header: {
      flexDirection: 'row',
      height: 24,
      alignItems: 'flex-end',
    },

    divider: {
      height: 1,
      marginTop: 12,
    },
  }
}

export default styles
