import Sound from 'react-native-sound'

import Bloop from './bloop.mp3'
import Chime from './chime.mp3'

// Do not interrupt ongoing music from phone
Sound.setCategory('Ambient', true)

const BloopSound = new Sound(Bloop)
const ChimeSound = new Sound(Chime)

export {
  BloopSound,
  ChimeSound,
}
