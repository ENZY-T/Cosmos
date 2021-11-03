//Interfaces
interface loggedAction {
    type: string,
}

interface loggedOutAction {
    type: string,
}

export type IUserAuthenticationActionTypes = loggedOutAction | loggedAction;

// Actions
export const userAuthenticated = () => ({type: 'LOG'});
export const userUnauthenticated = () => ({type: 'LOGOUT'});

// Default, Not logged any user
const defaultState: boolean = false;
// Reducer
export const loggingReducer = (state = defaultState, action: IUserAuthenticationActionTypes) => {
    switch (action.type) {
        case "LOG":
            return true;
        case "LOGOUT":
            return false;
        default:
            return (state);
    }
};

