import Sound from 'react-native-sound'

import Chime from './chime.mp3'

// Do not interrupt ongoing music from phone
Sound.setCategory('Ambient', true)

const ChimeSound = new Sound(Chime)

export {
  ChimeSound,
}
