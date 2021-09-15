import React from 'react'
import { Link } from 'react-router-dom'
import Classes from '../Styles/Nav.module.scss'
import Logo from '../img/logo.png'
import { useSelector } from 'react-redux'
import { AppState } from '../Store/RootStore'
import { ILoggedUser } from '../Services/Dtos'
import XButton from './StyledComponents/XButton'
import MenuProfile from './menu-Profile'

// Interface for the props
interface IProps {}

// Navbar Component
const Nav = (props: IProps) => {
  // useStates
  //Redux calls
  const loggedState = useSelector<AppState, boolean>(
    (state) => state.loggingReducer
  )
  const loggedUser = useSelector<AppState, ILoggedUser>(
    (state) => state.loggedUserReducer
  )
  const navState = useSelector<AppState, boolean>(
    (state) => state.navStateReducer
  )
  // No NavBar state
  if (!navState) {
    return null
  }

  //NavBar
  return (
    <div className={Classes.navBar}>
      <div className={Classes.bgLayer} />
      <div className={Classes.navLeft}>
        {/*Logo with home link*/}
        <Link to='/' className='navbar-brand'>
          <img src={Logo} alt='' />
        </Link>
      </div>
      <div className={Classes.navMid}>
        <div className={Classes.searchWrapper}>
          <i className='fas fa-search' />
        </div>
        {/*Call Me Button*/}
        <XButton invisible={false}>+94 76 569 4999</XButton>
        <XButton invisible={false}>Purchase</XButton>
        <XButton invisible={!loggedState}>
          <Link to='/AdminPanel'>Admin Panel</Link>
        </XButton>
      </div>
      <div className={Classes.navRight}>
        <MenuProfile />
        <div className={Classes.userName}>
          {loggedState ? `Hi, ${loggedUser?.fName}` : 'Guest'}
        </div>
        <div className={Classes.navBtnWrapper}>
          <div className={Classes.menuBtn} />
          <div className={Classes.menuBtn} />
        </div>
      </div>
    </div>
  )
}

export default Nav
