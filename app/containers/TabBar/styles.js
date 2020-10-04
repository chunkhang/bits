const styles = (theme) => {
  return {
    parentContainer: {
      position: 'relative',
    },

    mainContainer: {
      position: 'absolute',
      bottom: theme.globals.bottomGutter,
      height: theme.globals.tabBarHeight,
      width: '100%',
    },

    scrubsContainer: {
      flexDirection: 'row',
    },

    scrub: {
      flex: 1,
      height: theme.globals.tabBarHeight,
      width: theme.globals.tabBarHeight,
    },

    tabsContainer: {
      paddingHorizontal: theme.globals.horizontalGutter,
      flexDirection: 'row',
    },

    tabContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: '100%',
    },

    button: {
      borderRadius: 4,
      width: theme.globals.tabBarHeight,
      height: theme.globals.tabBarHeight,
    },
  }
}

export default styles
