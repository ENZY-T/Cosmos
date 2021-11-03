import React from 'react'
import Classes from '../Styles/Mission.module.scss'

const Mission = () => {
    return (
        <div className={Classes.container}>
            <div className={Classes.main}>
                <h2>
                    <span>Our</span> Mission
                </h2>
            </div>
            <div className={Classes.taglines}>
                <div className={Classes.knowledge}>
                    <h4>Simplifying the real world automation complexity
                        integrating the latest and advanced engineering aspects</h4>
                </div>
            </div>
        </div>
    )
}

export default Mission
