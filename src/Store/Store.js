import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Slices/UserSlice'
import appStateReducer from './Slices/AppStateSlice'
import adminStateReducer from './Slices/AdminStateSlice'

export const store = configureStore({
    reducer: {
        userState: userReducer, appState: appStateReducer, adminState:adminStateReducer
    },
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())