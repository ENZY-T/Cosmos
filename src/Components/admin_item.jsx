import React, {useState} from 'react'
import Classes from '../Styles/Admin_item.module.css'
import {serverUrl} from '../GlobalData/Global'
import {useDispatch, useSelector} from "react-redux";
import {setAdminFormOpen, setEditingAdminItem} from "../Store/Slices/AdminStateSlice";

const AdminItem = (props) => {
    const [promptOpen, setPromptOpen] = useState(false)

    const dispatch = useDispatch()
    const adminFormOpen = useSelector(state => state.adminState.adminFormOpen)

    const handleEdit = () => {
        dispatch(setEditingAdminItem(props.adminItem))
        dispatch(setAdminFormOpen(true))
    }

    //Casting Multiple CSS classes
    const classText = []
    classText.push(Classes.text)
    return (
        <div className={Classes.adminItem}>
            <img
                src={
                    props.adminItem.mediaURIs && serverUrl + props.adminItem.mediaURIs[0]
                }
                alt='No Preview'
            />
            <div className={Classes.dataPlate}>
                <div className={classText.join(' ')}>{props.adminItem.title}</div>
                <hr/>
                <div className={Classes.createdDate}>{`Created : ${new Date(
                    props.adminItem.createdDate
                ).toDateString()}`}</div>
            </div>
            <div className={Classes.tagline}>{props.adminItem.tagline}</div>
            <div className={Classes.btnPanel}>
                {props.isProjectsClicked && (
                    <i onClick={handleEdit} className='fas fa-edit'/>
                )}
                <i
                    aria-disabled
                    onClick={() => props.delItem(props.adminItem)}
                    className='fas fa-trash-alt'
                />
            </div>
            {/*<XPrompt*/}
            {/*    title={'Edit All in Editor Box'} promptText={'Do you want to continue ?'}*/}
            {/*    setYes={setEditBoxOpen} isOpen={promptOpen} setOpen={setPromptOpen}/>*/}
            {/*{isEditBoxOpen && (*/}
            {/*    <EditBox itemType={'Project'} adminItem={props.adminItem} isFullWidth*/}
            {/*             setFormVisibility={setEditBoxOpen}/>*/}
            {/*)}*/}
        </div>
    )
}

export default AdminItem
