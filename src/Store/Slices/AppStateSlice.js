import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    navState: true, alertMsg:null
}

export const appStateSlice = createSlice({
    name: 'appState', initialState, reducers: {
        setNavState: (state, action) => {
            state.navState = action.payload
        },
        setAlertMsg: (state, action) =>{
            state.alertMsg = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {setNavState, setAlertMsg} = appStateSlice.actions

export default appStateSlice.reducer