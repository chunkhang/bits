import { StyleSheet } from 'react-native'

const styles = (theme) => {
  return {
    mainContainer: {
      paddingHorizontal: theme.globals.horizontalGutter,
      paddingTop: theme.globals.topGutter,
      backgroundColor: theme.dynamics.background,
    },

    header: {
      flexDirection: 'row',
      height: 24,
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },

    leftContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 1,
    },

    rightContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 1,
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
      color: theme.dynamics.foreground,
    },

    divider: {
      height: StyleSheet.hairlineWidth,
      marginTop: 12,
      backgroundColor: theme.dynamics.foreground,
    },
  }
}

export default styles
