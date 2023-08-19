import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function YesNoDialog(props) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleYes = () => {
		handleClose();
		props.onYes();
	};

	return (
		<div>
			{props?.children ? (
				<div onClick={handleClickOpen}>{props?.children}</div>
			) : (
				<Button variant='outlined' onClick={handleClickOpen}>
					Open alert dialog
				</Button>
			)}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{props?.title}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>{props?.text || 'Are you sure?'}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleYes}>Yes</Button>
					<Button onClick={handleClose} autoFocus>
						No
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
