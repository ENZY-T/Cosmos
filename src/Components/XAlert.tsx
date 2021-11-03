import React, {ReactNode} from 'react';
import {AlertTitle} from "@mui/material";
import Alert from "@mui/material/Alert";

export type AlertType = 'success' | 'info' | 'warning' | 'error'

interface IProps{
    type:AlertType
    children:ReactNode
}

const XAlert = (props:IProps) => {
    return (
        <Alert severity={props.type}>
            <AlertTitle>{props.type.toUpperCase()}</AlertTitle>
            {props.children}
        </Alert>
    );
};

export default XAlert;