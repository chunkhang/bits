const styles = (theme) => {
  const { bottomGutter, tabBarHeight } = theme.globals
  return {
    mainContainer: {
      flex: 1,
      marginBottom: bottomGutter + tabBarHeight,
    },
  }
}

export default styles
