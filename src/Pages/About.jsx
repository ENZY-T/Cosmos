import React, {useContext, useEffect} from 'react'
import QuickAbout from '../Components/QuickAbout'
import {StaticHostContext} from '../Context/StaticHostContext'
import Classes from '../Styles/About.module.scss'
import HeadingGreenBoxed from '../Components/StyledComponents/Heading_greenBoxed'

const About = () => {
    //region useContext
    const {setActivePage} = {...useContext(StaticHostContext)}
    useEffect(()=>{
        setActivePage?.('about')
    },[])
    //endregion

    return (
        <div className={Classes.about}>
            <div className={Classes.quickAbout}>
                <QuickAbout>
                    {{
                        header: (
                            <HeadingGreenBoxed titleGreen={'Who'} titleRaw={'We Are'}
                                               className={'fontSize-onMobile rem-2_2'}/>
                        ),
                    }}
                </QuickAbout>
            </div>
        </div>
    )
}

export default About
