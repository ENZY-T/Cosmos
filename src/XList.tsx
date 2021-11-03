import React, {ReactNode} from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import { HashLink } from 'react-router-hash-link';
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

const XList = (props: { list: string[], className?:string }) => {
    return (
        <List className={props.className}
            sx={{
                width: '100%',
                maxWidth: 360,
                color: 'text.primary',
                bgcolor: 'action.selected',
                borderRadius: '4px'
            }}
            component="nav" aria-label="mailbox folders">

            {props.list.map((item, pos,list) => (
                <>
                    <HashLink smooth to='/#our_services'>
                    <ListItem key={pos} sx={{borderRadius: '4px'}} button>
                        <ListItemAvatar>
                            <ArticleIcon fontSize="large"/>
                        </ListItemAvatar>
                        <ListItemText primary={item}/>
                    </ListItem>

                    </HashLink>
                    {pos < (list.length -1) && <Divider light/>}
                </>
            ))}

        </List>
    );
};

export default XList;