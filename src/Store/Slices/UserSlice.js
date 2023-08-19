import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLogged: false,
	user: null,
	isAdmin: false,
};

export const userSlice = createSlice({
	name: 'userState',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.isAdmin = action.payload?.role === 'admin';
		},
		setIsLogged: (state, action) => {
			state.isLogged = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUser, setIsLogged } = userSlice.actions;

export default userSlice.reducer;
