import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {setAlertMsg} from "../Store/Slices/AppStateSlice";
import {useDispatch, useSelector} from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const AlertModal = () => {
    const alertMsg = useSelector(state => state.appState.alertMsg)
    const dispatch = useDispatch()
    const handleClose = () => dispatch(setAlertMsg(null));

    return (
        <div>
            <Modal
                open={alertMsg === null ? false : true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{color:'white'}} variant="h6" component="h2">
                        Alert
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, color:'white' }} >
                        {alertMsg}
                    </Typography>
                    <Box sx={{width:'100%'}}   display="flex" justifyContent="flex-end">
                        <Button onClick={handleClose}>Ok</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default AlertModal;