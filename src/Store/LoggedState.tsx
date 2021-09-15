//Interfaces
interface loggedAction {
    type: string,
}

interface loggedOutAction {
    type: string,
}

export type IUserActionTypes = loggedOutAction | loggedAction;

// Actions
export const setLogged = () => ({type: 'LOG'});
export const setLoggedOut = () => ({type: 'LOGOUT'});

// Default, Not logged any user
const defaultState: boolean = false;
// Reducer
export const loggingReducer = (state = defaultState, action: IUserActionTypes) => {
    switch (action.type) {
        case "LOG":
            return true;
        case "LOGOUT":
            return false;
        default:
            return (state);
    }
};

