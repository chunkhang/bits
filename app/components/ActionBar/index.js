import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'

import { useStyles } from '~/hooks'

import PlusIcon from '../PlusIcon'

import styles from './styles'

const ActionBar = () => {
  const classes = useStyles(styles)

  return (
    <View style={classes.mainContainer}>
      <Button
        icon={<PlusIcon size={16} />}
        buttonStyle={classes.buttonStyle}
        hitSlop={{
          top: 42,
          bottom: 42,
          left: 42,
          right: 42,
        }}
      />
    </View>
  )
}

export default ActionBar
