//Interfaces
interface navShowAction {
    type: string,
}

interface navHideAction {
    type: string,
}

export type INavActionTypes = navHideAction | navShowAction;

// Actions
export const setShowNav = () => ({type: 'SHOW'});
export const setHideNav = () => ({type: 'HIDE'});

// Default, Not logged any user
const defaultState: boolean = true;

// Reducer
export const navStateReducer = (state = defaultState, action: INavActionTypes) => {
    switch (action.type) {
        case "SHOW":
            return true;
        case "HIDE":
            return false;
        default:
            return (state);
    }
};

