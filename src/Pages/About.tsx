import React, {useContext} from 'react';
import QuickAbout from "../Components/QuickAbout";
import {StaticHostContext} from "../Context/StaticHostContext";
import XList from "../XList";
import Classes from '../Styles/About.module.scss'
import XLayout2Col from "../Components/StyledComponents/XLayout_2Col";
import HeadingGreenBoxed from "../Components/StyledComponents/Heading_greenBoxed";
import {globalCosmos} from "../GlobalData/Global";

const About = () => {
    //region useContext
    const {setActivePage} = {...useContext(StaticHostContext)}
    setActivePage?.('about')
    //endregion

    return (
        <div className={Classes.about}>
            <div className={Classes.quickAbout}><QuickAbout>{{
                header: (<HeadingGreenBoxed titleGreen={'Who'} titleRaw={'We Are'}/>)
            }}</QuickAbout></div>
        </div>
    );
};

export default About;