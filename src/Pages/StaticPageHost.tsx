import React, {useContext} from 'react';
import {Switch, useRouteMatch} from "react-router-dom";
import {Route} from "react-router";
import About from "./About";
import '../Styles/StaticHost.scss'
import coverImg from '../img/cover_about.jpg'
import Gallery from "./Gallery";
import {StaticHostContext} from "../Context/StaticHostContext";
import Heading_greenBoxed from "../Components/StyledComponents/Heading_greenBoxed";
import XLayout2Col from "../Components/StyledComponents/XLayout_2Col";
import XList from "../XList";
import {globalCosmos} from "../GlobalData/Global";
import ContactUs from "./Contact_Us";


const StaticPageHost = () => {
    const match = useRouteMatch();
    //region useContext
    const {activePage} = {...useContext(StaticHostContext)}
    //endregion

    const titleJsx = () => {
        switch (activePage) {
            // case 'about':
            //     return (<><span>About</span> Us</>)
            // case 'gallery':
            //     return (<><span>Gallery</span></>)

            case 'about':
                return (<Heading_greenBoxed titleGreen={'About'} titleRaw={'Us'} className={'ab-center'}/>)
            case 'gallery':
                return (<Heading_greenBoxed titleGreen={'Gallery'} className={'ab-center'}/>)
            case 'contactus':
                return (<Heading_greenBoxed titleGreen={'Contact'} titleRaw={'Us'} className={'ab-center'}/>)
        }
    }

    return (
        <div className='staticHost'>
            <section className='cover'>
                <img className='cover' src={coverImg} alt=""/>
                {/*<h2 className='ab-center'>{titleJsx()}</h2>*/}
                {titleJsx()}
            </section>

            <XLayout2Col>
                {{
                    col1:
                        <Switch>
                            <Route path={`${match.url}/about`} component={About}/>
                            <Route path={`${match.url}/contactus`} component={ContactUs}/>
                            <Route path={`${match.url}/gallery`} component={Gallery}/>
                        </Switch>,
                    col2: <XList list={globalCosmos.services}/>
                }}
            </XLayout2Col>

        </div>
    );
};

export default StaticPageHost;