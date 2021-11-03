import {IUserAuthenticationActionTypes} from "../LoggedState";
import {ILoggedUserActionTypes} from "../LoggedUser";
import {INavActionTypes} from "../NavState";


export type  AppActions = IUserAuthenticationActionTypes | ILoggedUserActionTypes | INavActionTypes;