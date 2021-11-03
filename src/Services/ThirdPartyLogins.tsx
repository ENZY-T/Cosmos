import React from 'react';
import GoogleLogin, {GoogleLoginResponse} from "react-google-login";
import {IUserAuthenticationActionTypes, userAuthenticated} from "../Store/LoggedState";
import {Dispatch} from "redux";
import axios from "axios";
import {serverUrl} from "../GlobalData/Global";
import {useDispatch} from "react-redux";
import {ILoggedUserActionTypes, setLoggedUser} from "../Store/LoggedUser";

export const ThirdPartyLogins = (props: { setSuccess?: (success: boolean) => void }) => {
    const dispatch = useDispatch<Dispatch<IUserAuthenticationActionTypes | ILoggedUserActionTypes>>()
    return (
        <div style={{textAlign: 'center', marginTop: '1rem'}}>
            <GoogleLogin
                clientId={'739532960944-v3n8196hltf8hfnilr25nai2fkibeqh9.apps.googleusercontent.com'}
                onSuccess={r => {
                    googleLogin((r as GoogleLoginResponse).tokenId, dispatch, props.setSuccess)
                }}
                onFailure={error => {
                    console.log(error.message.toString())
                    props.setSuccess && props.setSuccess(false)
                }}/>
        </div>
    );
};

export const googleLogin = async (token: string, dispatch: Dispatch<IUserAuthenticationActionTypes | ILoggedUserActionTypes>, setSuccess?: (success: boolean) => void) => {
    await axios.post(serverUrl + `/api/auth/google?token=${token}`)
        .then(res => {
            dispatch(userAuthenticated())
            dispatch(setLoggedUser(res.data))
            setSuccess && setSuccess(true)
        })
        .catch(error => {
            console.log(error.message.toString())
            setSuccess && setSuccess(false)
        })
}
