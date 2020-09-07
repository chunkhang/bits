import RNSound from 'react-native-sound'

import rootStore from '~/stores'

import Beep from './beep.mp3'
import Bloop from './bloop.mp3'
import Chime from './chime.mp3'
import Ding from './ding.mp3'

// Do not interrupt ongoing music from phone
RNSound.setCategory('Ambient', true)

class Sound {
  constructor(audio) {
    this.sound = new RNSound(audio)
  }

  play = () => {
    if (!rootStore.settingsStore.sounds) return
    this.sound.stop()
    this.sound.play()
  }
}

const BeepSound = new Sound(Beep)
const BloopSound = new Sound(Bloop)
const ChimeSound = new Sound(Chime)
const DingSound = new Sound(Ding)

export {
  BeepSound,
  BloopSound,
  ChimeSound,
  DingSound,
}
