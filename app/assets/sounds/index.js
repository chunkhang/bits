import Sound from 'react-native-sound'

import Bloop from './bloop.mp3'
import Chime from './chime.mp3'
import Ding from './ding.mp3'

// Do not interrupt ongoing music from phone
Sound.setCategory('Ambient', true)

const BloopSound = new Sound(Bloop)
const ChimeSound = new Sound(Chime)
const DingSound = new Sound(Ding)

export {
  BloopSound,
  ChimeSound,
  DingSound,
}
