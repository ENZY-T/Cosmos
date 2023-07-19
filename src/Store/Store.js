import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Slices/UserSlice'
import appStateReducer from './Slices/AppStateSlice'

export const store = configureStore({
    reducer: {
        userState: userReducer, appState: appStateReducer
    },
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())