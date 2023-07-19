import React, {useContext} from 'react'
import '../Styles/Nav_Menu.scss'
import {Link} from 'react-router-dom'
import {StaticHostContext} from '../Context/StaticHostContext'

const NavMenu = () => {
    //region Use Context
    const {activePage} = {...useContext(StaticHostContext)}
    //endregion


    let navLinkStatusDefault = {
        home: 'inactive',
        about: 'inactive',
        contactus: 'inactive',
        gallery: 'inactive',
    }

    let navLinkStatus = navLinkStatusDefault

    switch (activePage) {
        case 'home':
            navLinkStatus = navLinkStatusDefault
            navLinkStatus.home = 'active'
            break
        case 'about':
            navLinkStatus = navLinkStatusDefault
            navLinkStatus.about = 'active'
            break
    }

    return (
        <nav className={`nav nav-masthead justify-content-center`}>
            <Link to='/' className={`nav-link ${navLinkStatus.home}`}>
                Home
            </Link>
            {/*<Link to='/cosmos/gallery' className={`nav-link ${navLinkStatus.gallery}`}>Gallery</Link>*/}
            {/*<Link to='/cosmos/contactus' className={`nav-link ${navLinkStatus.contactus}`}>Contact Us</Link>*/}
            <Link to='/cosmos/about/' className={`nav-link ${navLinkStatus.about}`}>
                About
            </Link>
        </nav>
    )
}

export default NavMenu
