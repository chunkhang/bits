import { Alert } from 'react-native'
import I18n from 'i18n-js'

const notifyAlert = (props) => {
  const {
    title = null,
    message = null,
    done = I18n.t('general.ok'),
    onDone = () => null,
  } = props

  Alert.alert(
    title,
    message,
    [
      {
        text: done,
        style: 'default',
        onPress: onDone,
      },
    ],
  )
}

const confirmAlert = (props) => {
  const {
    title = null,
    message = null,
    confirm = I18n.t('general.ok'),
    onConfirm = () => null,
    cancel = I18n.t('general.cancel'),
    onCancel = () => null,
    destructive = false,
  } = props

  Alert.alert(
    title,
    message,
    [
      {
        text: cancel,
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: confirm,
        style: destructive ? 'destructive' : 'default',
        onPress: onConfirm,
      },
    ],
  )
}

export default {
  notifyAlert,
  confirmAlert,
}
