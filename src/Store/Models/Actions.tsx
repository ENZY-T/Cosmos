import {IUserActionTypes} from "../LoggedState";
import {ILoggedUserActionTypes} from "../LoggedUser";
import {INavActionTypes} from "../NavState";


export type  AppActions = IUserActionTypes | ILoggedUserActionTypes | INavActionTypes;