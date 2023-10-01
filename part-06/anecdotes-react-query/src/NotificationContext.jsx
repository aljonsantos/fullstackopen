import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET_NOTIF':
      return action.payload
    case 'CLEAR_NOTIF':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notif, dispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notif, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotifValue = () => {
  const [notif, dispatch] = useContext(NotificationContext)
  return notif
}

export const useNotifDispatch = () => {
  const [notif, dispatch] = useContext(NotificationContext)
  return dispatch
}

export const useShowNotif = () => {
  const dispatch = useNotifDispatch()
  return (message, seconds) => {
    dispatch({ type: 'SET_NOTIF', payload: message })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIF' })
    }, seconds * 1000)
  }
}


export default NotificationContext