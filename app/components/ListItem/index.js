import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Input, Text } from 'react-native-elements'
import { observer } from 'mobx-react'

import { useStyles, useStores } from '~/hooks'

import styles from './styles'

const ListItem = forwardRef((props, ref) => {
  const {
    value,
    onPress,
    editable,
    onChangeText,
    onSubmitEditing,
    returnKeyType,
    blurOnSubmit,
    color,
    containerStyle,
  } = props

  const classes = useStyles(styles)
  const { layoutStore } = useStores()

  const [backgroundColor, setBackgroundColor] = useState(color)
  useEffect(() => {
    if (color) {
      setBackgroundColor(color)
    } else {
      setBackgroundColor(layoutStore.tabColor)
    }
  }, [color, layoutStore.tabColor])

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[classes.mainContainer, containerStyle]}>
        <View style={[classes.dot, { backgroundColor }]} />
        {editable ? (
          <Input
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            blurOnSubmit={blurOnSubmit}
            containerStyle={classes.containerStyle}
            inputContainerStyle={classes.inputContainerStyle}
            inputStyle={classes.inputStyle}
            ref={ref}
          />
        ) : (
          <View style={classes.textContainer}>
            <Text style={classes.inputStyle}>
              {value}
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
})

ListItem.propTypes = {
  value: PropTypes.string,
  onPress: PropTypes.func,
  editable: PropTypes.bool,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  returnKeyType: PropTypes.string,
  blurOnSubmit: PropTypes.bool,
  color: PropTypes.string,
  containerStyle: PropTypes.object,
}

ListItem.defaultProps = {
  value: '',
  onPress: null,
  editable: false,
  onChangeText: null,
  onSubmitEditing: null,
  returnKeyType: 'done',
  blurOnSubmit: true,
  color: null,
  containerStyle: null,
}

export default observer(ListItem)
