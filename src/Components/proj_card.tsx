import React from 'react';
import Classes from '../Styles/proj_card.module.css'
const ProjCard = (props:{title:string, cover:string, description:string}) => {



    return (
        <div className={Classes.projCard}>
            <img className={Classes.cover} src={props.cover} alt={''}/>
            <div className={Classes.title}>{props.title}</div>
            <div className={Classes.description}>{props.description}</div>
        </div>
    );
};

export default ProjCard;