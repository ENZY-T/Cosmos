import React from 'react';
import ArticleSpace from "../Components/article_space";
import ProjSpace from "../Components/proj_space";
import Classes from '../Styles/Home.module.css'
const Home = (props: {name : string}) => {

    return (
        <div>
            {/*Home Cover*/}
            <div className={Classes.cover}>
                {/*Cover Background*/}
                <div className={Classes.background}>
                    <div className={Classes.overlay}/>
                </div>
                <div className={Classes.mainTitle}><span>Cosmos <br/> Engineering <br/> Solutions</span></div>
                <div className={Classes.subTitle}>
                    <span>We are Experts in the Engineering Industry
                        <br/>and We Create the Best Solutions
                        <br/> with the Best Technologies for Your Need
                    </span>
                </div>
                <h1>Cover</h1>
                <h3>{props.name ? 'Hi, ' + props.name : 'You are not logged in'}</h3>
                <div className={Classes.overlay}/>
            </div>
            <ArticleSpace/>
            <ProjSpace/>

        </div>
    );
    };

export default Home;