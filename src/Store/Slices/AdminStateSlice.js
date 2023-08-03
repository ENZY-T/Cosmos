import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    adminFormOpen:false, editingAdminItem:null,
    selectedAdminItemType:"project"
}

export const adminStateSlice = createSlice({

    name: 'adminState', initialState, reducers: {
        setAdminFormOpen: (state, action) => {
            if(!action.payload)
                state.editingAdminItem = null
            state.adminFormOpen = action.payload
        },
        setEditingAdminItem: (state, action) => {
            state.editingAdminItem = action.payload
        },
        setSelectedAdminItemType: (state, action) => {
            state.selectedAdminItemType = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const {setAdminFormOpen, setEditingAdminItem, setSelectedAdminItemType} = adminStateSlice.actions

export default adminStateSlice.reducer