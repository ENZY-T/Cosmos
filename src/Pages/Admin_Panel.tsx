import React, {SyntheticEvent, useState} from 'react';
import {Redirect, useHistory} from "react-router-dom";
import Classes from '../Styles/Admin_Panel.module.css'
import AdminItem from "../Components/admin_item";

//Only for admin
const AdminPanel = (props:{admin:boolean, setNavState:(navState:boolean)=>void}) => {
    const history = useHistory();

    // useStates
    const [projectClicked, setProjectClicked] = useState(false);

    // If NOT admin, redirects to home page
    if(!props.admin){
        props.setNavState(true);
        return <Redirect to='/'/>
    }
    // No NavBar in admin panel
    else {
        props.setNavState(false);
    }

    // Close button action
    const onCloseClick = () => {
        props.setNavState(true);
        history.push('/');
    };

    // Conditionally load the profPic or default image
    const userIcon = (
        <i className="fas fa-user-circle"/>
    );

    // Section buttons clicked logic
    let projectBtnStyle = [Classes.sectionButton];
    let articleBtnStyle = [Classes.sectionButton];
    projectBtnStyle.push(projectClicked ? Classes.sectionButton_Clicked : Classes.sectionButton);
    articleBtnStyle.push(!projectClicked ? Classes.sectionButton_Clicked : Classes.sectionButton);

    return (
        <div className={Classes.adminPanel}>
            <div className={Classes.adminPanel_Container}>
                <div className={Classes.left_Wrapper}>
                    <div className={Classes.userDisplay}>
                        {userIcon}
                        <p>Username</p>
                        <p>Description</p>
                    </div>

                    {/*Section Buttons*/}
                    <div className={Classes.sectionButtonWrapper}>
                        <div className={projectBtnStyle.join(' ')} onClick={()=>setProjectClicked(true)} >Projects</div>
                        <div className={articleBtnStyle.join(' ')} onClick={()=>setProjectClicked(false)} >Articles</div>
                    </div>


                </div>
                <div className={Classes.right_Wrapper}>
                    <div className={Classes.topBar}>
                        <div className={Classes.adminClose} onClick={onCloseClick}>
                            <i className="fas fa-times"/>
                        </div>
                        <div className={Classes.heading}>{projectClicked ? 'Projects' : 'Articles'}</div>
                    </div>
                    <div className={Classes.contentSpace_Wrapper}>
                        <AdminItem/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;