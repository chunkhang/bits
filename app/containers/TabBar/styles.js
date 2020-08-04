const styles = (theme) => {
  return {
    mainContainer: {
      position: 'absolute',
      bottom: theme.globals.bottomGutter,
      paddingHorizontal: theme.globals.horizontalGutter,
      height: theme.globals.tabBarHeight,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },

    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },

    icon: {
      borderRadius: 2,
      width: 18,
      height: 18,
    },

    addButton: {
      borderRadius: 2,
      width: 36,
      height: 36,
    },
  }
}

export default styles
