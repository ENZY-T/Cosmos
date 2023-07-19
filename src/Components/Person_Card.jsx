import React from 'react';
import Classes from '../Styles/Person_card.module.scss'

const PersonCard = (props) => {
    return (
        <div className={`row justify-content-center gx-5 ${Classes.personCard}`}>

            {/*Avatar*/}
            <div className="col align-self-center">
                <img src={props.person.avatar} alt="Person" className={`person ${Classes.avatar}`}/>
            </div>

            {/*Text Banner*/}
            <div className=" col-auto align-items-center align-self-center text-left">
                <h3>{props.person.name}</h3>
                <p>{props.person.position}</p>
                <ul className="navbar-nav social share-list ml-auto">
                    <li className="nav-item">
                        <a href={props.person.fb} className={`nav-link ${Classes.navLink}`}><i
                            className="fab fa-facebook-f"/></a>
                    </li>
                    <li className="nav-item">
                        <a href={props.person.twitter} className={`nav-link ${Classes.navLink}`}><i
                            className="fab fa-twitter"/></a>
                    </li>
                    <li className="nav-item">
                        <a href={props.person.linkedin} className={`nav-link ${Classes.navLink}`}><i
                            className="fab fa-linkedin-in"/></a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PersonCard;