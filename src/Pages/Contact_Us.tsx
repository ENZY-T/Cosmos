import React, {useContext} from 'react';
import {StaticHostContext} from "../Context/StaticHostContext";

const ContactUs = () => {
    //region useContext
    const {setActivePage} = {...useContext(StaticHostContext)}
    setActivePage?.('contactus')
    //endregion

    return (
        <div>
            <div className={'hw-100'}><h1 className={' font-poppin-3-center-dark'}>Under-Construction</h1></div>
        </div>
    );
};

export default ContactUs;