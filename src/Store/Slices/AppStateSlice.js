import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    navState: true,
}

export const appStateSlice = createSlice({
    name: 'appState', initialState, reducers: {
        setNavState: (state, action) => {
            state.navState = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setNavState} = appStateSlice.actions

export default appStateSlice.reducer