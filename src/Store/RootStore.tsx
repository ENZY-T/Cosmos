import {combineReducers, compose, createStore} from "redux";
import {loggingReducer} from "./LoggedState"
import {loggedUserReducer} from "./LoggedUser";
import {navStateReducer} from "./NavState";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const rootReducer = combineReducers({loggingReducer, loggedUserReducer, navStateReducer})

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer , composeEnhancers());