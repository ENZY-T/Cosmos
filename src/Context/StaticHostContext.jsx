import React, {createContext, useState} from 'react';


export const StaticHostContext = createContext(null)

const StaticHostContextProvider = (props) => {
        const [activePage, setActivePage] = useState('home')

        const contextObject = {
            activePage,
            setActivePage
        }


        return (
            <StaticHostContext.Provider value={contextObject}>
                {props.children}
            </StaticHostContext.Provider>
        );
    }
;

export default StaticHostContextProvider;