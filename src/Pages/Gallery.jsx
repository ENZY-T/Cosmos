import React, {useContext, useEffect} from 'react';
import {StaticHostContext} from "../Context/StaticHostContext";
import Classes from '../Styles/Gallery.module.scss'

const Gallery = () => {
    //region useContext
    const {setActivePage} = {...useContext(StaticHostContext)}
    useEffect(()=>{
        setActivePage?.('gallery')
    },[])
    //endregion

    return (
        <div className={Classes.gallery}>
            <div className={'hw-100'}><h1 className={' font-poppin-3-center-dark'}>Under-Construction</h1></div>
        </div>
    );
};

export default Gallery;