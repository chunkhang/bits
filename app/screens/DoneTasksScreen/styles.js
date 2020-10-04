const styles = (theme) => {
  const { bottomGutter, tabBarHeight } = theme.globals
  return {
    mainContainer: {
      flex: 1,
      paddingBottom: bottomGutter + tabBarHeight,
      backgroundColor: theme.dynamics.background,
    },
  }
}

export default styles
