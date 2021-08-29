import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Classes from '../Styles/Nav.module.scss'
import Logo from '../img/logo.png'
import styled from "styled-components";

// Interface for the props
interface IProps {
    name: string,
    setName: (name: string) => void,
    navState: boolean,
    admin:boolean
}
const Nav = (props:IProps) => {
    // useStates
        //should have for: loggedState and pass it to adminPanel Button & profile icons
    const [profileClicked, setProfileClicked] = useState(false);



    const logout = async () => {
        await fetch('http://localhost:8000/api/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        props.setName('')
    };


// Styled components
    //interface for sProps to pass into style component
    interface sProps {
        invisible:boolean,
    }
    const IButton = styled.button<sProps>`
      margin: 8px;
      border: 1.5px solid var(--globalGreen);
      border-radius: 3px;
      background-color: var(--globalGreen_Trans);
      transition: all, 2s, ease-out;
      visibility: ${ sProps=> sProps.invisible?"hidden": "visible"};

      font-size: 1.05em;
      font-weight: 400;
      text-decoration: none;
      color: var(--globalWhite);
      padding: 0.25em 0.5em;

      & * {
        text-decoration: none;
      }

      &:hover {
        color: azure;
        background-color: rgba(5, 130, 131, 0.65);
        transition: all 0.3s ease-out;
      }
    `;

// Conditionally load the profPic or default image
    const userIcon = (loggedState:boolean) => {
        // Not implemented
        const IProfileIcon = styled.i`
          margin-top: 3px;
          font-size: 34px;
          color: var(--globalWhite);
          text-align: center;
          cursor: var(--globalMouseHand);
          
          &:hover{
            color: azure;
          }
        `;

        return <IProfileIcon onClick={()=>setProfileClicked(!profileClicked)} className="fas fa-user-circle"/>
    }


// Toggle menu items with login
    // Not logged in
    const menuState1 = (clickedState:boolean) => (
        <div className={Classes.profile}>
            {userIcon(false)}
            <IButton onClick={()=>setProfileClicked(false)} invisible={!profileClicked}><Link to="/login" aria-disabled="true">Login</Link></IButton>
            <IButton onClick={()=>setProfileClicked(false)} invisible={!profileClicked}><Link to="/register">Register</Link></IButton>
        </div>

    );
    // Logged in
    const menuState2 = (clickedState:boolean) => (
        <div className={Classes.profile}>
            {userIcon(true)}
            {clickedState ? <IButton onClick={()=>setProfileClicked(false)} invisible={false}><Link to="/login" aria-disabled="true" onClick={logout}>Logout</Link></IButton> : null}
        </div>

    );
    // Show logout if logged in
    const navMenu = (props.name === undefined || props.name === '') ? menuState1(profileClicked) : menuState2(profileClicked);

    // No NavBar state
    if (!props.navState) {
        return null
    }


//Nav Bar
    return (
        <div className={Classes.navBar}>
            <div className={Classes.bgLayer}/>
            <div className={Classes.navLeft}>
                {/*Logo with home link*/}
                <Link to="/" className="navbar-brand"><img src={Logo} alt=""/></Link>
            </div>
            <div className={Classes.navMid}>
                <div className={Classes.searchWrapper}><i className="fas fa-search"/></div>
                {/*Call Me Button*/}
                <IButton  onClick={()=>setProfileClicked(false)} invisible={false}>+94 76 569 4999</IButton>
                <IButton  onClick={()=>setProfileClicked(false)} invisible={false}>Purchase</IButton>
                <IButton  onClick={()=>setProfileClicked(false)} invisible={!props.admin}><Link to="/AdminPanel">Admin Panel</Link></IButton>
            </div>
            <div className={Classes.navRight}>
                {navMenu}
                <div className={Classes.navBtnWrapper}>
                    <div className={Classes.menuBtn}/>
                    <div className={Classes.menuBtn}/>
                </div>


            </div>
        </div>
    );
};

export default Nav;
