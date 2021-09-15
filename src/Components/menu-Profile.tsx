import React, { useState } from 'react'
import Classes from '../Styles/MenuProfile.module.scss'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../Store/RootStore'
import axios from 'axios'
import { serverUrl } from '../GlobalData/Global'
import { ILoggedUserActionTypes, setLoggedOutUser } from '../Store/LoggedUser'
import { Dispatch } from 'redux'
import XButton from './StyledComponents/XButton'
import { IUserActionTypes, setLoggedOut } from '../Store/LoggedState'

const IProfileIcon = styled.i`
  margin-top: 3px;
  font-size: 34px;
  color: var(--globalWhite);
  text-align: center;
  cursor: var(--globalMouseHand);

  &:hover {
    color: azure;
  }
`

const MenuProfile = () => {
  //should have for: loggedState and pass it to adminPanel Button & profile icons
  const [profileClicked, setProfileClicked] = useState(false)
  const loggedState = useSelector<AppState, boolean>(
    (state) => state.loggingReducer
  )
  const dispatchLoggedUser = useDispatch<Dispatch<ILoggedUserActionTypes>>()
  const dispatchLoggedState = useDispatch<Dispatch<IUserActionTypes>>()
  // Conditionally load the profPic or default image
  const userIcon = (loggedState: boolean) => {
    // Not implemented

    return (
      <IProfileIcon
        onClick={() => setProfileClicked(!profileClicked)}
        className='fas fa-user-circle'
      />
    )
  }

  const logout = async () => {
    setProfileClicked(false)
    await axios
      .post(serverUrl + '/api/auth/logout', null, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          dispatchLoggedUser(setLoggedOutUser())
          dispatchLoggedState(setLoggedOut())
        }
      })
      .catch((error) => alert(error.message))
  }

  // Toggle menu items with login
  // When clicked => checks the loggedState inside
  const menuState_Clicked = (loggedState: boolean) => {
    const notLogged = (
      <div>
        <XButton onClick={() => setProfileClicked(false)} invisible={false}>
          <Link to='/login' aria-disabled='true'>
            Login
          </Link>
        </XButton>
        <XButton onClick={() => setProfileClicked(false)} invisible={false}>
          <Link to='/register'>Register</Link>
        </XButton>
      </div>
    )
    const logged = (
      <XButton onClick={() => logout()} invisible={false}>
        Logout
      </XButton>
    )
    return loggedState ? logged : notLogged
  }

  return (
    <div className={Classes.profile}>
      {userIcon(false)}
      {profileClicked ? menuState_Clicked(loggedState) : null}
    </div>
  )
}
export default MenuProfile
