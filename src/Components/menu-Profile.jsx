import React, {useEffect, useRef, useState} from 'react'
import Classes from '../Styles/MenuProfile.module.scss'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {serverUrl} from '../GlobalData/Global'
import XButton from './StyledComponents/XButton'
import {useOutClickedAlert} from "../Services/PopupWrapper";
import {setIsLogged, setUser} from "../Store/Slices/UserSlice";

const IProfileIcon = styled.i`
  margin-top: 3px;
  margin-bottom: 10px;
  font-size: 3rem;
  color: var(--globalWhite);
  text-align: center;
  cursor: var(--globalMouseHand);


  &:hover {
    color: azure;
  }
`


const MenuProfile = (props) => {
    //should have for: loggedState and pass it to adminPanel Button & profile icons
    // const [thisNode, setThisNode] = useState(null);
    const [profileClicked, setProfileClicked] = useState(false)

    const isUserLogged = useSelector((state) => state.userState.isLogged)
    const loggedUser = useSelector((state) => state.userState.user)
    const dispatch = useDispatch()


    const wrapperNode = useRef(null)
    const [isOutClicked, setIsOutClicked] = useState(false);
    useOutClickedAlert(wrapperNode, setIsOutClicked)

    useEffect(() => {
        if (profileClicked) setIsOutClicked(false)
    }, [profileClicked])

    useEffect(() => {
        if (isOutClicked) setProfileClicked(false)
    }, [isOutClicked])

    // Conditionally load the profPic or default image
    const userIcon = (loggedState) => {
        // Not implemented

        return (<IProfileIcon
            onClick={() => setProfileClicked(!profileClicked)}
            className='fas fa-user-circle'
        />)
    }


    const logout = async () => {
        setProfileClicked(false)
        await axios
            .post(serverUrl + '/api/auth/logout', null, {withCredentials: true})
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setIsLogged(false))
                    dispatch(setUser(null))
                }
            })
            .catch((error) => alert(error.message))
    }

    // Toggle menu items with login
    // When clicked => checks the loggedState inside
    const menuState_Clicked = (loggedState) => {
        const notLogged = (<div>
            <Link to='/login' aria-disabled='true'>
                <XButton onClick={() => setProfileClicked(false)} invisible={'false'}>
                    Login
                </XButton>
            </Link>
            <Link to='/register'>
                <XButton onClick={() => setProfileClicked(false)} invisible={'false'}>
                    Register
                </XButton>
            </Link>
        </div>)
        const logged = (<div>
            <Link to='/AdminPanel'>
                {(loggedUser?.role === 'admin') ? <XButton invisible={'false'}>
                    Admin Panel
                </XButton> : null}
            </Link>

            <a><XButton onClick={() => logout()} invisible={'false'}>
                Logout
            </XButton>
            </a>
        </div>)
        return loggedState ? logged : notLogged
    }

    return (<div ref={wrapperNode}
                 className={`${profileClicked ? Classes.profileClicked : Classes.profile} ${props?.className?.toString()}`}>
        {userIcon(false)}
        {profileClicked ? menuState_Clicked(isUserLogged) : null}
    </div>)
}
export default MenuProfile
