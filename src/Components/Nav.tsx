import React from 'react'
import {Link} from 'react-router-dom'
import Classes from '../Styles/Nav.module.scss'
import Logo from '../img/logo.png'
import {useSelector} from 'react-redux'
import {AppState} from '../Store/RootStore'
import {ILoggedUser} from '../Services/Dtos'
import XButton from './StyledComponents/XButton'
import MenuProfile from './menu-Profile'
import {contactDetails, globalSettings} from '../GlobalData/Global'
import NavMenu from "./Nav_Menu";


// Navbar Component
const Nav = () => {
    // useStates
    //Redux calls
    const loggedState = useSelector<AppState, boolean>(
        (state) => state.loggingReducer
    )
    const loggedUser = useSelector<AppState, ILoggedUser>(
        (state) => state.loggedUserReducer)
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
            <div className={Classes.bgLayer}/>
            <div className={Classes.navLeft}>
                {/*Logo with home link*/}
                <Link to='/' className={Classes.navbar_brand}>
                    <img src={Logo} alt='Logo'/>
                </Link>
                <div className={Classes.nameBanner}>
                    <h3><span>COSMOS</span><br/>AUTOMATION SYSTEMS PVT. LTD.</h3>
                </div>
            </div>
            <div className={Classes.navMid}>
                <XButton invisible={!globalSettings.isPurchaseOpen}>Purchase</XButton>
                {/*<div className={Classes.searchWrapper}>*/}
                {/*    <i className='fas fa-search'/>*/}
                {/*</div>*/}
                {/*Call Me Button*/}
                <a href={`tel:${contactDetails.tele}`}>
                    <XButton invisible={false}>{contactDetails.tele}</XButton>
                </a>
            </div>
            <div className={Classes.navRight}>
                <MenuProfile/>
                <div className={Classes.userName}>
                    {loggedState ? `Hi, ${loggedUser?.fName}` : 'Guest'}
                </div>
                <div className={Classes.navBtnWrapper}>
                    <NavMenu/>
                </div>
            </div>
        </div>
    )
}

export default Nav
