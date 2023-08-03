import React from 'react';
import GoogleLogin from "react-google-login";
import axios from "axios";
import {serverUrl} from "../GlobalData/Global";
import {useDispatch} from "react-redux";
import {setUser} from "../Store/Slices/UserSlice";

export const ThirdPartyLogins = (props) => {
    const dispatch = useDispatch()
    return (
        <div style={{textAlign: 'center', marginTop: '1rem'}}>
            <GoogleLogin
                // TODO: take this key to env variables and remove revealing
                clientId={'739532960944-v3n8196hltf8hfnilr25nai2fkibeqh9.apps.googleusercontent.com'}
                onSuccess={r => {
                    googleLogin((r).tokenId, dispatch, props.setSuccess)
                }}
                onFailure={error => {
                    console.log(error.message?.toString())
                    props.setSuccess && props.setSuccess(false)
                }}/>
        </div>
    );
};

export const googleLogin = async (token, dispatch, setSuccess) => {
    await axios.post(serverUrl + `/api/auth/google?token=${token}`)
        .then(res => {
            dispatch(setUser(true))
            dispatch(setUser(res.data))
            setSuccess && setSuccess(true)
        })
        .catch(error => {
            console.log(error.message.toString())
            setSuccess && setSuccess(false)
        })
}
