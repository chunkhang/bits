import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'

import { Lightbox } from '~/components'

const CreateScreen = () => {
  return (
    <Lightbox dismissable>
      <View style={{ backgroundColor: 'grey', height: 100, bottom: 0, position: 'absolute', width: '100%' }}>
        <Text>Hello world</Text>
      </View>
    </Lightbox>
  )
}

export default CreateScreen
