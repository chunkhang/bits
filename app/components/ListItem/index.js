import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import { Input, Text } from 'react-native-elements'

import { useStyles } from '~/hooks'

import styles from './styles'

const ListItem = ({
  value,
  onPress,
  editable,
  onChangeText,
  onSubmitEditing,
  returnKeyType,
  blurOnSubmit,
  color,
  containerStyle,
}) => {
  const classes = useStyles(styles)

  return (
    <TouchableOpacity
      style={[
        classes.mainContainer,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[classes.dot, { backgroundColor: color }]} />
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
        />
      ) : (
        <View style={classes.textContainer}>
          <Text style={classes.inputStyle}>
            {value}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

ListItem.propTypes = {
  value: PropTypes.string,
  onPress: PropTypes.func,
  editable: PropTypes.bool,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  returnKeyType: PropTypes.string,
  blurOnSubmit: PropTypes.bool,
  color: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
}

ListItem.defaultProps = {
  value: '',
  onPress: null,
  editable: false,
  onChangeText: null,
  onSubmitEditing: null,
  returnKeyType: null,
  blurOnSubmit: true,
  containerStyle: null,
}

export default ListItem
