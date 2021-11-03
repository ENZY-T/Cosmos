import React, {createContext, ReactNode, useState} from 'react';

//Context only for the admin panel

export interface IAdminPanelContext {
    //region Refresh
    // NOTE -: This works changing the value regardless of value == true OR false.
    //          Changes triggers the actions under a useEffect via dependency array
    //          Always use refreshPanel() to trig
    needRefresh: boolean
    refreshPanel: () => void
    //endregion
}

export const AdminPanelContext = createContext<IAdminPanelContext | null>(null);

const AdminPanelContextProvider = (props: { children: ReactNode }) => {
    const [needRefresh, setNeedRefresh] = useState(false)

    const refreshPanel = ()=> setNeedRefresh(!needRefresh)

    //region Context Object
    const adminPanelContext: IAdminPanelContext = {
        //region Need Refresh
        refreshPanel,
        needRefresh
        //endregion
    }
    //endregion

    return (
        <AdminPanelContext.Provider value={adminPanelContext}>
            {props.children}
        </AdminPanelContext.Provider>
    );
};

export default AdminPanelContextProvider;