import React from 'react';
import Person_Card from "./Person_Card";
import Classes from '../Styles/Team_Space.module.scss'
import {dummyPerson} from "../Services/Dtos";
import {teamCrew} from "../GlobalData/Global";

const TeamSpace = () => {


    const personListJsx = teamCrew.map((item, pos) => {
        return <Person_Card key={pos} person={item}/>
    })

    return (
        <div className={Classes.teamSpace}>
            <div className={Classes.title}>
                <span>
                  <span>Team</span> of Experts
                </span>
            </div>
            <div className={Classes.text}>
                <p>Ethics and integrity are the bases on which our professionals build their careers.
                    They are fundamentals that become daily attitudes.</p>
            </div>
            {personListJsx}
        </div>
    );
};

export default TeamSpace;