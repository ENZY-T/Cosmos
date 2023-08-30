import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Classes from '../Styles/Nav.module.scss';
import Logo from '../img/logo.png';
import { useSelector } from 'react-redux';
import XButton from './StyledComponents/XButton';
import MenuProfile from './menu-Profile';
import { contactDetails } from '../GlobalData/Global';
import NavMenu from './Nav_Menu';

// Navbar Component
const Nav = () => {
	// Defined Values
	const burgBtnInactive = {
		state: false,
		hideInMobile: 'is-hidden-mobile',
		clickedState: '',
	};

	const burgBtnActive = {
		state: true,
		hideInMobile: '',
		clickedState: 'is-active',
	};

	// useStates
	const [burgBtnState, setBurgBtnState] = useState(burgBtnInactive);
	//Redux calls
	const loggedState = useSelector((state) => state.userState.isLogged);
	const loggedUser = useSelector((state) => state.userState.user);
	const navState = useSelector((state) => state.appState.navState);
	// No NavBar state
	if (!navState) {
		return null;
	}

	function handleBurgBtnClicked() {
		if (burgBtnState.state) {
			setBurgBtnState(burgBtnInactive);
		} else {
			setBurgBtnState(burgBtnActive);
		}
	}

	//NavBar
	return (
		<div className={Classes.navBar}>
			<div className={Classes.bgLayer} />
			<div className={Classes.navLeft}>
				<div className='is-flex is-flex-direction-row'>
					{/*Logo with home link*/}
					<Link to='/' className={Classes.navbar_brand}>
						<img src={Logo} alt='Logo' />
					</Link>

					<div className={Classes.nameBanner}>
						<h3>
							<span>COSMOS</span>
							<br />
							AUTOMATION SYSTEMS PVT. LTD.
						</h3>
					</div>
				</div>
				<a
					role='button'
					onClick={handleBurgBtnClicked}
					className={`navbar-burger mr-5 is-align-self-center d-md-none ${burgBtnState.clickedState}`}
					aria-label='menu'
					aria-expanded='false'
				>
					<span aria-hidden='true' />
					<span aria-hidden='true' />
					<span aria-hidden='true' />
				</a>
			</div>
			<div className={`${Classes.navMid} ${burgBtnState.hideInMobile}`}>
				{/*<XButton invisible={!globalSettings.isPurchaseOpen}>Purchase</XButton>*/}
				{/*<div className={Classes.searchWrapper}>*/}
				{/*    <i className='fas fa-search'/>*/}
				{/*</div>*/}
				{/*Call Me Button*/}
				<a className={Classes.btnTopTelLink} href={`tel:${contactDetails.tele}`}>
					<XButton className={Classes.btnTopTel} invisible={'false'}>
						{contactDetails.tele}
					</XButton>
				</a>
			</div>
			<div className={`${Classes.navRight} ${burgBtnState.hideInMobile}`}>
				<MenuProfile className={'is-hidden-mobile'} />
				<div className={Classes.userName}>{loggedState ? `Hi, ${loggedUser?.fName}` : 'Guest'}</div>
				<NavMenu />
			</div>
		</div>
	);
};

export default Nav;