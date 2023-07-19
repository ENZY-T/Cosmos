import React from 'react';
import {AlertTitle} from "@mui/material";
import Alert from "@mui/material/Alert";


const XAlert = (props) => {
    return (
        <Alert severity={props.type}>
            <AlertTitle>{props.type.toUpperCase()}</AlertTitle>
            {props.children}
        </Alert>
    );
};

export default XAlert;