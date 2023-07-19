import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ArticleSpace from '../Components/article_space';
import ProjSpace from '../Components/proj_space';
import Classes from '../Styles/Home.module.scss';
import QuickAbout from '../Components/QuickAbout';
import TeamSpace from '../Components/Team_Space';
import Mission from '../Components/Mission';
import {StaticHostContext} from '../Context/StaticHostContext';
import {setNavState} from "../Store/Slices/AppStateSlice";
import axios from "axios";
import {serverUrl} from "../GlobalData/Global";
import {setIsLogged, setUser} from "../Store/Slices/UserSlice";

const Home = () => {
    const dispatch = useDispatch()

    // dispatch(setNavState(true))


    useEffect(() => {
        // Fetching the logged user back
        ;(async () =>
            await axios
                .get(serverUrl + '/api/auth/user', {withCredentials: true})
                .then((res) => {
                    res.status === 200 &&
                    alert('hit')
                    dispatch(setIsLogged(true)) &&
                    dispatch(setUser(res.data))
                }).catch(err=>{

                }))()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //region Use Context
    const {setActivePage} = {...useContext(StaticHostContext)};
    setActivePage?.('home');
    //endregion

    return (<div className={Classes.HomeWrapper}>
        {/*Home Cover*/}
        <div className={Classes.cover}>
            {/*Cover Background*/}
            <div className={Classes.background}>
                <div className={Classes.overlay}/>
            </div>
            <div className={Classes.mainTitle}>
                <p>COSMOS</p>
                <p>Automation Systems (Pvt) Ltd.</p>
            </div>
            <div className={Classes.subTitle}>
          <span>
            Best Industrial Automation Solutions.
            <br/>
            We Consult and Solve Your Automation Needs.
            <br/>
          </span>
            </div>
            <div className={Classes.overlay}/>
        </div>
        <div style={{padding: '5.45% 9.75% 5.45% 9.75% '}}>
            <QuickAbout/>
        </div>
        <div id='our_services'>
            <ArticleSpace/>
        </div>
        {/*<div className={Classes.textContent}>*/}
        {/*    <p></p>*/}
        {/*</div>*/}
        <ProjSpace/>
        <Mission/>
        {/*<div className={Classes.textContent}>*/}
        {/*    <p></p>*/}
        {/*</div>*/}
        <TeamSpace/>
    </div>);
};

export default Home;
