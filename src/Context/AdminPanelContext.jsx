import React, {createContext, useState} from 'react';


export const AdminPanelContext = createContext(null);

const AdminPanelContextProvider = (props) => {
    const [needRefresh, setNeedRefresh] = useState(false)

    const refreshPanel = () => setNeedRefresh(!needRefresh)

    //region Context Object
    const adminPanelContext = {
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