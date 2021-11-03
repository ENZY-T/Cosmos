//Interfaces
import { ILoggedUser } from '../Services/Dtos'

interface setLoggedUserAction {
  type: string
  payload: ILoggedUser
}

interface unsetUserAction {
  type: string
  payload: ILoggedUser | null
}

export type ILoggedUserActionTypes = setLoggedUserAction | unsetUserAction

// Actions
export const setLoggedUser = (loggedUser: ILoggedUser) => ({
  type: 'SET_LOGGED_USER',
  payload: loggedUser,
})
export const setLoggedOutUser = () => ({ type: 'SET_USER_NULL', payload: null })

// Default state
const defaultUserState: ILoggedUser | null = null

// Reducer
export const loggedUserReducer = (
  state = defaultUserState,
  action: ILoggedUserActionTypes
) => {
  switch (action.type) {
    case 'SET_LOGGED_USER':
      return action.payload
    case 'SET_USER_NULL':
      return null
    default:
      return state
  }
}
