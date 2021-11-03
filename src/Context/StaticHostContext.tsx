import React, {createContext, ReactNode, useState} from 'react';

type IActivePage = 'home' | 'about' | 'gallery' | 'contactus'

export interface IStaticHostContext {
    activePage: IActivePage
    setActivePage: (activePage: IActivePage) => void
}

export const StaticHostContext = createContext<IStaticHostContext | null>(null)

const StaticHostContextProvider = (props: { children: ReactNode }) => {
        const [activePage, setActivePage] = useState<IActivePage>('home')

        const contextObject: IStaticHostContext = {
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